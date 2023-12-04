import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asset } from '../models/asset.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private url = 'http://localhost:3000/asset';
  private assets: Asset[] = [];
  private assetSubject = new Subject<Asset[]>();

  constructor(private http: HttpClient) {}

  getAssets() {
    this.http.get<{ assets: Asset[] }>(this.url).subscribe((assetData) => {
      this.assets = assetData.assets;
      this.assetSubject.next([...this.assets]);
    });
  }

  getAsset(id: string) {
    return { ...this.assets.find((ast) => ast._id === id) };
  }

  assetListener() {
    return this.assetSubject.asObservable();
  }

  createAsset(asset: Asset) {
    const newAsset = {
      _id: '',
      assetTag: asset.assetTag,
      assetName: asset.assetName,
      description: asset.description,
      assetType: asset.assetType,
    };
    this.http
      .post<{ message: string; assetId: string }>(this.url, newAsset)
      .subscribe((createdAsset) => {
        newAsset._id = createdAsset.assetId;
        this.assets.push(newAsset);
        this.assetSubject.next([...this.assets]);
      });
  }

  updateAsset(asset: Asset, id: string) {
    this.http.get<Asset>(`${this.url}/${id}`).subscribe((existingAsset) => {
      const changes = [];
      for (const key in asset) {
        if (existingAsset[key] !== asset[key]) {
          changes.push({
            field: key,
            oldValue: existingAsset[key],
            newValue: asset[key],
          });
        }
      }
      const updatedAsset = {
        _id: id,
        assetTag: asset.assetTag,
        assetName: asset.assetName,
        description: asset.description,
        assetType: asset.assetType,
        history: [...existingAsset.history, { changes }],
      };
      console.log('Updated asset DONE');
      this.http
        .put<Asset>(`${this.url}/${id}`, updatedAsset)
        .subscribe((updatedAsset) => {
          console.log(updatedAsset);
          this.assetSubject.next([...this.assets]);
        });
    });
  }

  deleteAsset(id: string) {
    this.http.delete<Asset>(`${this.url}/${id}`).subscribe(() => {
      this.getAssets();
      this.assetSubject.next([...this.assets]);
    });
  }
}
