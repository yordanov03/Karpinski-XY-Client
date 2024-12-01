import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtService {
  private jwtToken: string | null = null;
  private username: string | null = null;
  private readonly tokenKey = 'authToken';
  private readonly usernameKey = 'username';
  private readonly tokenExpiryKey = 'authTokenExpiry';

  // Set token with expiration logic
  setToken(token: string, username: string, expiresInSeconds: number): void {
    const expirationTime = Date.now() + expiresInSeconds * 1000; // Expiration time in milliseconds
    this.jwtToken = token;
    this.username = username;

    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.usernameKey, username);
    localStorage.setItem(this.tokenExpiryKey, expirationTime.toString());
  }

  getToken(): string | null {
    if (!this.isTokenValid()) {
      this.clearToken(); // Clear the token if it's expired
      return null;
    }

    if (!this.jwtToken) {
      this.jwtToken = localStorage.getItem(this.tokenKey);
    }
    return this.jwtToken;
  }

  getUsername(): string | null {
    if (!this.isTokenValid()) {
      this.clearToken(); // Clear the username if the token is expired
      return null;
    }

    if (!this.username) {
      this.username = localStorage.getItem(this.usernameKey);
    }
    return this.username;
  }

  isTokenValid(): boolean {
    const expirationTime = localStorage.getItem(this.tokenExpiryKey);
    if (!expirationTime) {
      return false;
    }

    return Date.now() < parseInt(expirationTime, 10); // Check if the current time is before the expiration time
  }

  clearToken(): void {
    this.jwtToken = null;
    this.username = null;
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.tokenExpiryKey);
  }
}
