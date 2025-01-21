// const AWS = require("aws-sdk");

// AWS.config.update({ region: "Europe (Stockholm) eu-north-1" });

// const s3 = new AWS.S3();
// const S3_BUCKET = "myapnacollegebucket";

// module.exports = { s3, S3_BUCKET };

// Importing S3 client from AWS SDK v3

const { S3Client } = require("@aws-sdk/client-s3");

// Create an S3 client instance with the appropriate region
const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: "AKIAWOOXT2L3OQSUYDEJ",
    secretAccessKey: "0zHc/BFj5GghLRLIC6le2hpvETdYORZ1nnkWmSCP",
    // sessionToken: "your-session-token",
  },
});

const S3_BUCKET = "myapnacollegebucket";

module.exports = { s3, S3_BUCKET };

//IAM

//Accesskey:    AKIAWOOXT2L3OQSUYDEJ

//secrete key:   0zHc/BFj5GghLRLIC6le2hpvETdYORZ1nnkWmSCP
