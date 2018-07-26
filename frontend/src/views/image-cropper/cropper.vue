<template>
    <div class="page-cropper">
		<el-form label-position="top">
			<div class="cropper-toolbar">
				<div>
					<el-form-item label=" ">
						<el-button type="primary" @click="chooseImage">Choose Image</el-button>
						<input id="upload" type="file" accept="image/*" @change="openImage" hidden/>
					</el-form-item>
				</div>
				<template v-if="cropper">
					<div>
						<el-form-item label="Aspect ratio">
							<el-select v-model="aspectRatio"
									   @change="changeAspectRatio"
									   class="select-aspect">
								<el-option v-for="(ratio, label) in aspectRatios"
										   :label="label"
										   :value="ratio"
										   :key="ratio" />
							</el-select>
						</el-form-item>
					</div>
					<div>
						<el-form-item label="Flip">
							<el-button @click="flipHorizontal">H</el-button>
							<el-button @click="flipVertical">V</el-button>
						</el-form-item>
					</div>
					<div>
						<el-form-item label="Zoom" class="slider-box">
							<el-slider v-model="zoom" :min="1" :max="50"/>
							<el-button icon="el-icon-zoom-in" @click="zoomIn"></el-button>
							<el-button icon="el-icon-zoom-out" @click="zoomOut"></el-button>
						</el-form-item>
					</div>
					<div>
						<el-form-item label="Rotate" class="slider-box">
							<el-slider v-model="rotate" :min="1" :max="45" />
							<el-button icon="el-icon-arrow-left" @click="rotateLeft"></el-button>
							<el-button icon="el-icon-arrow-right" @click="rotateRight"></el-button>
						</el-form-item>
					</div>
					<div>
						<el-form-item label=" ">
							<el-button type="warning" @click="resetCropper(false)">Reset</el-button>
							<el-button @click="previewImage">Preview</el-button>
							<el-button type="success" @click="uploadImage">Upload</el-button>
						</el-form-item>
					</div>
				</template>
			</div>
		</el-form>
        <el-row>
            <el-col class="image-box">
                <img id="image"/>
            </el-col>
        </el-row>
		<el-dialog title="Image preview"
				   :visible.sync="showPreview"
				   fullscreen>
			<div class="preview-image">
				<img :src="imageData" />
			</div>
			<span slot="footer">
				<el-button @click="showPreview = false">Close</el-button>
		  	</span>
		</el-dialog>
    </div>
</template>

<script>
	import Cropper from 'cropperjs';

	export default {
		name: 'image-cropper',
		data() {
			return {
				cropper: null,
				aspectRatio: 1,
				aspectRatios: {
					Free: null,
					'1:1': 1,
					'2:1': 2,
					'4:3': 4 / 3,
					'16:9': 16 / 9,
					'21:31': 21 / 31
				},
				scaleX: 1,
				scaleY: 1,
				zoom: 10,
				rotate: 45,
				inputFile: {},
				showPreview: false,
				imageData: null
			};
		},
		mounted() {
			this.$store.dispatch('setHeader', {
				type: 'main',
				title: 'Image Cropper'
			});
		},
		methods: {
			chooseImage() {
				document.querySelector('#upload').click();
			},
			openImage(input) {
				if (input.target.files.length) {
					this.inputFile = input.target.files[0];
					let reader = new FileReader();
					let image = document.querySelector('#image');

					reader.onload = e => {
						image.setAttribute('src', e.target.result);
						this.resetCropper(true);

						this.cropper = new Cropper(image, {
							viewMode: 1,
							dragMode: 'move',
							toggleDragModeOnDblclick: false,
							aspectRatio: this.aspectRatio,
							cropBoxMovable: false
						});
					};

					reader.readAsDataURL(input.target.files[0]);
				}
			},
			resetCropper(destroy = false) {
				if (this.cropper) {
					if (destroy)
						this.cropper.destroy();
					else
						this.cropper.reset();

					this.scaleX = 1;
					this.scaleY = 1;
				}
			},
			changeAspectRatio() {
				if (this.cropper)
					this.cropper.setAspectRatio(this.aspectRatio);
			},
			flipHorizontal() {
				if (this.cropper) {
					this.scaleX = -(this.scaleX);
					this.scale();
				}
			},
			flipVertical() {
				if (this.cropper) {
					this.scaleY = -(this.scaleY);
					this.scale();
				}
			},
			scale() {
				this.cropper.scale(this.scaleX, this.scaleY);
			},
			zoomIn() {
				if (this.cropper)
					this.cropper.zoom(this.zoom / 100);
			},
			zoomOut() {
				if (this.cropper)
					this.cropper.zoom(-(this.zoom / 100));
			},
			rotateLeft() {
				if (this.cropper)
					this.cropper.rotate(-(this.rotate));
			},
			rotateRight() {
				if (this.cropper)
					this.cropper.rotate(this.rotate);
			},
			previewImage() {
				let canvas = this.cropper.getCroppedCanvas();
				this.imageData = canvas.toDataURL();
				this.showPreview = true;
			},
			uploadImage() {
				this.cropper.getCroppedCanvas().toBlob(blob => {
					let formData = new FormData();
					formData.append('image', blob, this.inputFile.name);
					this.$api.images.save(formData).then(response => {
						this.$utils('showResponse', response);
					}, err => {
						this.$utils('handleError', err);
					});
				}, this.inputFile.type);
			}
		}
	};
</script>
