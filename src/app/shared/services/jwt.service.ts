import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class JwtService {
  private jwtToken: string | null = null;
  private username: string | null = null;
  private readonly tokenKey = 'authToken';
  private readonly usernameKey = 'username';
  private readonly tokenExpiryKey = 'authTokenExpiry';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  private get storage(): Storage | null {
    return isPlatformBrowser(this.platformId) ? localStorage : null;
  }

  // Set token with expiration logic
  setToken(token: string, username: string, expiresInSeconds: number): void {
    const expirationTime = Date.now() + expiresInSeconds * 1000; // Expiration time in milliseconds
    this.jwtToken = token;
    this.username = username;

    const storage = this.storage;
    if (storage) {
      storage.setItem(this.tokenKey, token);
      storage.setItem(this.usernameKey, username);
      storage.setItem(this.tokenExpiryKey, expirationTime.toString());
    }
  }

  getToken(): string | null {
    if (!this.isTokenValid()) {
      this.clearToken(); // Clear the token if it's expired
      return null;
    }

    if (!this.jwtToken) {
      this.jwtToken = this.storage?.getItem(this.tokenKey) || null;
    }
    return this.jwtToken;
  }

  getUsername(): string | null {
    if (!this.isTokenValid()) {
      this.clearToken(); // Clear the username if the token is expired
      return null;
    }

    if (!this.username) {
      this.username = this.storage?.getItem(this.usernameKey) || null;
    }
    return this.username;
  }

  isTokenValid(): boolean {
    const expirationTime = this.storage?.getItem(this.tokenExpiryKey);
    if (!expirationTime) {
      return false;
    }

    return Date.now() < parseInt(expirationTime, 10); // Check if the current time is before the expiration time
  }

  clearToken(): void {
    this.jwtToken = null;
    this.username = null;
    const storage = this.storage;
    if (storage) {
      storage.removeItem(this.tokenKey);
      storage.removeItem(this.usernameKey);
      storage.removeItem(this.tokenExpiryKey);
    }
  }
}
