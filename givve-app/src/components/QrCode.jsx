import qrImg from "../assets/qr.png";


export function QrCode({ size = 132 }) {
  return (
    <img
      src={qrImg}
      alt="QR Code"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}

