<template>
	<div class="container">
		<div>
			<h2>Single File</h2>
			<hr/>
				<input type="file" @change="onUpload( $event )"/>
			<br><br><br>
			<button v-on:click="submitFile()">Submit</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	
	export default {
		data(){
			return {
				selectedFile: ''
			}
		},
		
		methods: {
			onUpload( event ){
				this.selectedFile = event.target.files[0]
                console.log(event)
			},
			
			submitFile(){
				let formData = new FormData();
				
				formData.append('file', this.selectedFile, this.selectedFile.name);
				
				axios.post( 'http://localhost:5000/issues',
					formData,
					{
						headers: {
								'Content-Type': 'multipart/form-data'
						},
						body: JSON.stringify()
					}
				)				
				.then(function(){
					console.log('SUCCESS!!');
				})
				.catch(function(){
					console.log('FAILURE!!');
				});
			}
		}
	}
</script>

<style scoped>
.container {
	text-align: center;
}

button {
	width: 20%;
	background-color: pink;
}
</style>