const QRCode = require('qrcode');

async function generateQR(req,res) {
  const computerId = req.params.computerId;
  const stringdata = `http://127.0.0.1:3000/computer/read_status/${computerId}`;

  QRCode.toString(stringdata, {type:'terminal'}, function (err, url) {
    if(err) return console.log("error occurred")
    console.log(url)
  })
}

module.exports = { generateQR };