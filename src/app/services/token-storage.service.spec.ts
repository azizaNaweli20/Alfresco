import { TestBed } from '@angular/core/testing';
import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and get a token', () => {
    const token = 'test-token';
    service.saveToken(token);

    const retrievedToken = service.getToken();
    expect(retrievedToken).toBe(token);
  });

  it('should remove a token', () => {
    const token = 'test-token';
    service.saveToken(token);
    expect(service.getToken()).toBe(token);

    service.signOut();
    expect(service.getToken()).toBeNull();
  });

  it('should save and get user data', () => {
    const user = { username: 'testuser', email: 'test@example.com' };
    service.saveUser(user);

    const retrievedUser = service.getUser();
    expect(retrievedUser).toEqual(user);
  });

  it('should remove user data on sign out', () => {
    const user = { username: 'testuser', email: 'test@example.com' };
    service.saveUser(user);
    expect(service.getUser()).toEqual(user);

    service.signOut();
    expect(service.getUser()).toBeNull();
  });
});
