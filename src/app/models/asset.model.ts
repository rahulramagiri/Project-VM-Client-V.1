export interface Asset {
  _id: string;
  assetTag: string;
  assetName: string;
  description: string;
  assetType: string;
  history?: [
    {
      field: String;
      oldValue: any;
      newValue: any;
      timestamp: Date;
    }
  ];
}
