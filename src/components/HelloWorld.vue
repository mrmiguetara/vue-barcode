<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{latitude}},{{longitude}}
    <p>
      {{decodedResult}}
    </p>
    <button v-on:click="scan()">
      scan
    </button>
    <div id="reader" width="600px"></div>
  </div>
</template>

<script>
// To use Html5QrcodeScanner (more info below)
import {Html5QrcodeScanner} from "html5-qrcode"

// To use Html5Qrcode (more info below)
// import {Html5Qrcode} from "html5-qrcode"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {

      longitude : {},
      latitude : {},
      decodedResult: ''
    }
  },
  created() {
    this.$barcodeScanner.init(this.onBarcodeScanned)

    //do we support geolocation
    if(!("geolocation" in navigator)) {
      // this.errorStr = 'Geolocation is not available.';
      return;
    }

    // this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(pos => {
      // this.gettingLocation = false;
      // this.location = pos;
      this.latitude = pos.coords.latitude
      this.longitude = pos.coords.longitude
    }, err => {
      // this.gettingLocation = false;
      // this.errorStr = err.message;
      console.error(err)
    })
  },
  methods: {
    onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
      this.decodedResult = decodedResult
    },
    onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    },
    scan() {
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: {width: 250, height: 250} },
        /* verbose= */ false);
      html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure);
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
