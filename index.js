const nftData = [
  { url: "Model/C5_12_1", src: "Object/C5_12_1.png" },
  { url: "Model/C5_12_2", src: "Object/C5_12_2.png" },
  { url: "Model/C5_12_3", src: "Object/C5_12_3.png" },
  { url: "Model/C5_12_4", src: "Object/C5_12_4.png" },
  { url: "Model/C5_13_1", src: "Object/C5_13_1.png" },
  { url: "Model/C5_13_2", src: "Object/C5_13_2.png" },
  { url: "Model/C5_13_3", src: "Object/C5_13_3.png" },
  { url: "Model/C5_13_4", src: "Object/C5_13_4.png" },
  { url: "Model/C5_13_5", src: "Object/C5_13_5.png" },
  { url: "Model/C5_13_6", src: "Object/C5_13_6.png" },
  { url: "Model/C5_13_7", src: "Object/C5_13_7.png" },
  { url: "Model/C5_13_8", src: "Object/C5_13_8.png" },
  { url: "Model/C5_13_9", src: "Object/C5_13_9.png" },
  { url: "Model/C5_13_10", src: "Object/C5_13_10.png" },
  { url: "Model/C5_13_11", src: "Object/C5_13_11.png" },
];
const scene = document.getElementById("scene");

nftData.forEach((data) => {
  const nft = document.createElement("a-nft");
  nft.setAttribute("type", "nft");
  nft.setAttribute("url", data.url);
  // nft.setAttribute("smooth", "true");
  // nft.setAttribute("smoothCount", "10");
  // nft.setAttribute("smoothTolerance", "0.02");
  // nft.setAttribute("smoothThreshold", "3");

  const entity = document.createElement("a-entity");
  entity.setAttribute("class", "box-and-text");
  entity.setAttribute("position", "0 0 0");
  entity.setAttribute("rotation", "0 0 0");
  entity.setAttribute("scale", "1 1 1");
  entity.setAttribute("visible","true");
  
  const image = document.createElement("a-image");
  image.setAttribute("src", data.src); // Đường dẫn tới ảnh trong thư mục Object/
  image.setAttribute("position", "0 0 0");
  image.setAttribute("width", "300");
  image.setAttribute("height", "300");

  entity.appendChild(image);
  // nft.appendChild(entity);
  
  scene.appendChild(nft);
  scene.appendChild(entity);
});
var tpic=1;
//Sự kiện nft
document.addEventListener('DOMContentLoaded', function () {
  // Lấy tất cả các thẻ NFT
  const nftMarkers = document.querySelectorAll('a-nft');
  const enti = document.querySelectorAll('.box-and-text');
  const trackedEntities = {};
  nftMarkers.forEach((marker, index) => {
    marker.addEventListener('markerFound', () => {
      // Lấy vị trí của marker (tọa độ) trong không gian 3D
      const position = marker.getAttribute('position'); // Trả về chuỗi "x y z"
      console.log('Position data type:', typeof position);
      console.log(position.x);
      console.log(position.y);
      console.log(position.z);
      console.log('NFT marker found at position:', index + 1); 
      tpic=index+1;
      // enti[index].setAttribute("position", "0 0 -1300");
      enti[index].setAttribute("rotation", "0 0 0");
      // enti[index].setAttribute("scale", "1.5 1.5 1.5");
      trackedEntities[index] = true;
    });
    marker.addEventListener('markerLost', () => {
      console.log('NFT marker lost!');

    });
    //vị trí ban đầu
    const currentPosition = { x: 0, y: 0, z: -2000 };
     // Hàm tính toán vị trí mượt
    const lerp = (start, end, alpha) => start + (end - start) * alpha;
    const MAX_DISTANCE = 50;
    // Lấy vị trí liên tục
    const updateMarkerPosition = () => {
      if (trackedEntities[index]) {
        const targetPosition = marker.object3D.position; // Vị trí mục tiêu từ marker
        if (Math.abs(currentPosition.x - targetPosition.x) > MAX_DISTANCE ||
          Math.abs(currentPosition.y - targetPosition.y) > MAX_DISTANCE ||
          Math.abs(currentPosition.z - targetPosition.z) > MAX_DISTANCE) {
            // Tính toán vị trí mượt
          currentPosition.x = lerp(currentPosition.x, targetPosition.x/2 + 220/2, 0.15); // Alpha = 0.1
          currentPosition.y = lerp(currentPosition.y, targetPosition.y/2 + 250/2, 0.15);
          currentPosition.z = lerp(currentPosition.z, targetPosition.z/2, 0.15);

          // Cập nhật vị trí cho `enti`
          enti[index].setAttribute("position", `${currentPosition.x} ${currentPosition.y} ${currentPosition.z}`);
        }
      }
      requestAnimationFrame(updateMarkerPosition); // Tiếp tục lặp lại
    };
    updateMarkerPosition(); // Bắt đầu vòng lặp
  });
});
