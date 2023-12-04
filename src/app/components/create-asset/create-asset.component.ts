import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Asset } from 'src/app/models/asset.model';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css'],
})
export class CreateAssetComponent implements OnInit {
  assetForm!: FormGroup;
  private mode = 'create';
  private assetId: string | null = '';
  private asset: Asset;

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.assetForm = this.fb.group({
      assetTag: ['', Validators.required],
      assetName: ['', Validators.required],
      description: ['', Validators.required],
      assetType: ['', Validators.required],
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // can also use enum
      if (paramMap.has('assetId')) {
        this.mode = 'edit';
        this.assetId = paramMap.get('assetId');
        this.asset = this.assetService.getAsset(this.assetId);
        this.assetForm.patchValue({
          assetTag: this.asset.assetTag,
          assetName: this.asset.assetName,
          description: this.asset.description,
          assetType: this.asset.assetType,
        });
      } else {
        this.mode = 'create';
        this.assetId = null;
      }
    });
  }

  onSubmitForm() {
    console.log(this.mode);

    if (!this.assetForm.valid) return;
    const formData = this.assetForm.value;
    if (this.mode === 'create') {
      this.assetService.createAsset(formData);
    } else if (this.mode === 'edit') {
      console.log(this.assetId);
      console.log(this.mode);
      console.log(this.assetForm.value);
      this.assetService.updateAsset(formData, this.assetId);
    }
    this.assetForm.reset();
  }
}
