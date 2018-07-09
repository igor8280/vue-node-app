<template>
    <div>
        <el-row>
            <el-col>
                <el-button type="primary" @click="chooseImage">Choose Image</el-button>
                <input id="upload" type="file" accept="image/*" @change="openImage" hidden/>
                <el-row v-show="cropper">
                    <el-col :span="2">
                        <p>Aspect Ratio</p>
                        <el-select v-model="aspectRatio" @change="changeAspectRatio">
                            <el-option :value="null" label="Free"/>
                            <el-option :value="1" label="1:1"/>
                            <el-option :value="2" label="2:1"/>
                            <el-option :value="4 / 3" label="4:3"/>
                            <el-option :value="16 / 9" label="16:9"/>
                            <el-option :value="21 / 31" label="21:31"/>
                        </el-select>
                    </el-col>

                    <el-col :span="3">
                        <p>Flip</p>
                        <el-button @click="flipHorizontal">H</el-button>
                        <el-button @click="flipVertical">V</el-button>
                    </el-col>

                    <el-col :span="8">
                        <p>Zoom</p>
                        <el-row>
                            <el-col :span="15">
                                <el-slider v-model="zoom" :min="1" show-input/>
                            </el-col>
                            <el-col :span="8" :offset="1">
                                <el-button @click="zoomIn" icon="el-icon-zoom-in"/>
                                <el-button @click="zoomOut" icon="el-icon-zoom-out"/>
                            </el-col>
                        </el-row>
                    </el-col>

                    <el-col :span="8">
                        <p>Rotate</p>
                        <el-row>
                            <el-col :span="15">
                                <el-slider v-model="rotate" :min="1" :max="360" show-input/>
                            </el-col>
                            <el-col :span="8" :offset="1">
                                <el-button @click="rotateLeft"><</el-button>
                                <el-button @click="rotateRight">></el-button>
                            </el-col>
                        </el-row>
                    </el-col>

                    <el-col :span="3">
                        <p>&nbsp;</p>
                        <el-button type="warning" @click="resetCropper(false)">Reset</el-button>
                        <el-button type="success">OK</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col class="image-box">
                <img id="image"/>
            </el-col>
        </el-row>
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
				scaleX: 1,
				scaleY: 1,
				zoom: 10,
				rotate: 45
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
			}
		}
	};
</script>
