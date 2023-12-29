// Create a shared service
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private favoriteCountSource = new BehaviorSubject<number>(0);
  currentFavoriteCount = this.favoriteCountSource.asObservable();

  updateFavoriteCount(count: number) {
    this.favoriteCountSource.next(count);
    console.log('Updating Favorite Count:', count);
  }
}
