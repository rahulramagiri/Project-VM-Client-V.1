export interface Asset {
  _id: string;
  assetTag: string;
  assetName: string;
  description: string;
  assetType: string;
  history?: [
    {
      timestamp: Date;
      changes: [{ field: string; oldValue: any; newValue: any }];
    }
  ];
}
