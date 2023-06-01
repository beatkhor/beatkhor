import { environment } from '@environments/environment';
import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('StorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.clear = jest.fn();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read item with correct formatted key', () => {
    const mockKey = 'example';
    service.read(mockKey);
    expect(localStorage.getItem).toHaveBeenCalledWith(environment.storageKeyPrefix + '-' + mockKey);
  });

  it('should write item with correct formatted key', () => {
    const mockKey = 'example';
    const value = 'example-value';
    service.write(mockKey, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(environment.storageKeyPrefix + '-' + mockKey, value);
  });

  it('should clear the storage', () => {
    service.clear();
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
