import { TestBed } from '@angular/core/testing';
import { ModelService } from './model.service';
import { responseData } from '../../interfaces/model.httpRes';
import { of, throwError } from 'rxjs';

describe('ModelService', () => {
  let service: ModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelService]
    });
    service = TestBed.inject(ModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a successful response without retries', (done) => {
    spyOn(service, 'randomFailOrSucceed').and.returnValue(of(service.httpResponse[0]));
  
    service.simulateHttpRes();
  
    setTimeout(() => {
      expect(service.randomFailOrSucceed).toHaveBeenCalled();
      expect(service.randomFailOrSucceed).toHaveBeenCalledTimes(1);
      done();
    }, 4000); // Increased delay to give enough time for interval emissions
  });
  

  it('should retry 3 times and then fail', (done) => {
    spyOn(service, 'randomFailOrSucceed').and.returnValue(throwError(() => new Error('Simulated network error')));
  
    let retryCount = 0;
    spyOn(console, 'log').and.callFake((message: string) => {
      if (message.includes('Retry attempt #')) {
        retryCount++;
      }
    });
  
    service.simulateHttpRes();
  
    setTimeout(() => {
      expect(service.randomFailOrSucceed).toHaveBeenCalledTimes(1); // Only one HTTP call starts
      expect(retryCount).toBe(3); // Ensure 3 retries
      done();
    }, 20000); // Allow time for retries
  });

  it('should handle error after retries are exhausted', (done) => {
    spyOn(service, 'randomFailOrSucceed').and.returnValue(throwError(() => new Error('Simulated network error')));
  
    let errorCaught = false;
    spyOn(console, 'error').and.callFake((message: string) => {
      if (message.includes('Error after retries:')) {
        errorCaught = true;
      }
    });
  
    service.simulateHttpRes();
  
    setTimeout(() => {
      expect(service.randomFailOrSucceed).toHaveBeenCalled();
      expect(service.randomFailOrSucceed).toHaveBeenCalledTimes(4); // 1 initial call + 3 retries
      expect(errorCaught).toBeTrue();
      done();
    }, 20000); // Allow time for retries and error handling
  });
  

  it('should randomly succeed or fail based on the logic', (done) => {
    const originalRandom = Math.random;
    let randomSpy = spyOn(Math, 'random').and.callFake(() => 0.9); // Force failure
  
    service.simulateHttpRes();
  
    setTimeout(() => {
      expect(service.randomFailOrSucceed).toHaveBeenCalled();
      expect(Math.random).toHaveBeenCalled();
      expect(service.randomFailOrSucceed).toHaveBeenCalledTimes(1); // Check if it fails
  
      randomSpy.and.callFake(() => 0.1); // Force success
  
      service.simulateHttpRes();
  
      setTimeout(() => {
        expect(service.randomFailOrSucceed).toHaveBeenCalledTimes(2); // Check if it succeeds
        Math.random = originalRandom; // Restore original function
        done();
      }, 4000);
    }, 4000);
  });
  
});



// import { TestBed } from '@angular/core/testing';

// import { ModelService } from './model.service';

// describe('ModelService', () => {
//   let service: ModelService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ModelService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
