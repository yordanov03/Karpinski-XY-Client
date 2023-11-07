import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class JwtService {
  private jwtToken: string | null = null;

  setToken(token: string): void {
    this.jwtToken = token;
  }

  getToken(): string | null {
    return this.jwtToken;
  }

  clearToken(): void {
    this.jwtToken = null;
  }
}