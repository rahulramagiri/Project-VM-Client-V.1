import { Component, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/asset.model';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  assets: Asset[] = [];
  displayedColumns: string[] = [
    'assetTag',
    'timestamp',
    'assetName',
    'assetType',
    'description',
  ];

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.assetService.getAssets();
    this.assetService.assetListener().subscribe((data) => {
      this.assets = data;
    });
  }
}
