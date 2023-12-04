import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Asset } from 'src/app/models/asset.model';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
})
export class AssetsComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  assets: Asset[] = [];
  private assetSub: Subscription;

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.assetService.getAssets();
    this.assetSub = this.assetService.assetListener().subscribe((assetData) => {
      this.assets = assetData;
    });
  }

  onDelete(id: string) {
    this.assetService.deleteAsset(id);
  }

  ngOnDestroy(): void {
    this.assetSub.unsubscribe();
  }
}
