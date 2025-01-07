// Get the interactive box and text elements
const The = document.querySelector('#box-and-text');

// Variables to keep track of mouse/touch position and rotation
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

// Function to handle mouse/touch down event
function onPointerDown(event) {
  isDragging = true;
  lastMouseX = event.clientX || event.touches[0].clientX;
  lastMouseY = event.clientY || event.touches[0].clientY;
}

// Function to handle mouse/touch move event
function onPointerMove(event) {
  if (isDragging) {
    const currentX = event.clientX || event.touches[0].clientX;
    const currentY = event.clientY || event.touches[0].clientY;
    const deltaX = currentX - lastMouseX;
    const deltaY = currentY - lastMouseY;
    
    // Update box rotation based on movement
    const TheRotation = The.getAttribute('rotation');
    The.setAttribute('rotation', {
      x: TheRotation.x + deltaY * 0.2,
      y: TheRotation.y + deltaX * 0.2,
      z: TheRotation.z
    });
    lastMouseX = currentX;
    lastMouseY = currentY;
  }
}

// Function to handle mouse/touch up event
function onPointerUp() {
  isDragging = false;
}

// Add event listeners for mouse and touch events
document.addEventListener('mousedown', onPointerDown);
document.addEventListener('mousemove', onPointerMove);
document.addEventListener('mouseup', onPointerUp);

document.addEventListener('touchstart', onPointerDown);
document.addEventListener('touchmove', onPointerMove);
document.addEventListener('touchend', onPointerUp);

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
  const entity = document.createElement("a-entity");
  entity.setAttribute("class", "box-and-text");
  //entity.setAttribute("position", "0 0 -590");
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
  const confirmationDiv = document.querySelector('.kt');
  const kq = document.querySelector('.kq');
  const trackedEntities = {};
  nftMarkers.forEach((marker, index) => {
    marker.addEventListener('markerFound', () => {
      trackedEntities[index] = true;
      tpic=index+1;
      // Hiển thị thẻ div khi tìm thấy marker
      confirmationDiv.style.display = 'block';
      kq.style.display = 'block'; 
      loadQuestionsByTopic(tpic);
    });
    marker.addEventListener('markerLost', () => {
      trackedEntities[index]= false;
      // Bắt đầu đếm thời gian 2 giây
      setTimeout(() => {
        // Kiểm tra lại nếu marker vẫn chưa được nhận diện lại
        if (!trackedEntities[index]) {
          enti[index].setAttribute("position", "0 0 -2000");
          confirmationDiv.style.display = 'none';
          kq.style.display = 'none';
        }
      }, 1000); // 1 giây
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
          currentPosition.x = lerp(currentPosition.x, targetPosition.x/2 + 210/2, 0.15); // Alpha = 0.1
          currentPosition.y = lerp(currentPosition.y, targetPosition.y/2 + 260/2, 0.15);
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

function addstart() {
  const div = document.querySelector('.home'); 
  if (div.classList.contains('d-none')) {
    div.classList.remove('d-none'); // Nếu có 'd-none' thì xóa
  } else {
    div.classList.add('d-none'); // Nếu không có thì thêm
  }
}
function addhd() {
  const div0 = document.querySelector('.tthd'); 
  const div = document.querySelector('.hd1'); 
  const div1 = document.querySelector('.hd2');
  const next = document.querySelector('.next'); 
  if (div.classList.contains('d-none')&&div1.classList.contains('d-none')) {
    div.classList.remove('d-none'); // Nếu có 'd-none' thì xóa
    div0.classList.remove('d-none'); // Nếu có 'd-none' thì xóa
    next.classList.remove('d-none'); // Nếu có 'd-none' thì xóa
  } 
  else if(div1.classList.contains('d-none')) {
    div1.classList.remove('d-none');
    div.classList.add('d-none');
  }
  else{
    div1.classList.add('d-none');
    div0.classList.add('d-none');
    next.classList.add('d-none'); // Nếu có 'd-none' thì xóa

  }
}
function addt() {
  const div = document.querySelector('.cau-hoi'); 
  const div1 = document.querySelector('.one');  
  if (div.classList.contains('d-none')) {
    div.classList.remove('d-none'); // Nếu có 'd-none' thì xóa
  } else {
    div.classList.add('d-none'); // Nếu không có thì thêm
  }

  // Kiểm tra và thay đổi class 'd-none' của div .one
  if (div1.classList.contains('d-none')) {
    div1.classList.remove('d-none'); // Nếu có 'd-none' thì xóa
  } else {
    div1.classList.add('d-none'); // Nếu không có thì thêm
  }
}
//Bộ câu hỏi
const questions = [
  {
    topic: 1,
    question: "Phan Bội Châu đã phát động phong trào nào nhằm đưa thanh niên Việt Nam sang Nhật học tập?",
    answers: [
      "A. Phong trào Duy Tân",
      "B. Việt Nam Quang Phục Hội",
      "C. Phong trào Đông Du",
      "D. Tân Việt Cách mạng Đảng"
    ],
    correct: 3 // Đáp án đúng là "C. Phong trào Đông Du"
  },
  {
    topic: 1,
    question: "Năm 1912, Phan Bội Châu thành lập tổ chức nào ở Trung Quốc với mục tiêu bạo lực lật đổ Pháp?",
    answers: [
      "A. Việt Nam Quang Phục Hội",
      "B. Phong trào Đông Du",
      "C. Tân Việt Cách mạng Đảng",
      "D. Tự Lực Văn Đoàn"
    ],
    correct: 1 // Đáp án đúng là "A. Việt Nam Quang Phục Hội"
  },
  {
    topic: 1,
    question: "Tư tưởng cách mạng của Phan Bội Châu có đặc điểm gì nổi bật?",
    answers: [
      "A. Đề cao cải cách ôn hòa, không sử dụng bạo lực",
      "B. Chủ trương cách mạng vũ trang và tìm kiếm sự hỗ trợ quốc tế cho độc lập dân tộc",
      "C. Tập trung phát triển giáo dục trong nước, không quan tâm đến cách mạng",
      "D. Chỉ dựa vào lực lượng trong nước mà không tìm kiếm hỗ trợ từ bên ngoài"
    ],
    correct: 2 // Đáp án đúng là "B. Chủ trương cách mạng vũ trang và tìm kiếm sự hỗ trợ quốc tế cho độc lập dân tộc"
  },  
  {
    topic: 2,
    question: "Năm 1906, Phan Châu Trinh đã phát động phong trào Duy Tân nhằm mục tiêu gì?",
    answers: [
      "A. Chống Pháp bằng bạo lực",
      "B. Cải cách giáo dục và xã hội",
      "C. Tuyên truyền cách mạng vô sản",
      "D. Tổ chức thanh niên học tập tại Nhật Bản"
    ],
    correct: 2 // Đáp án đúng là "B. Cải cách giáo dục và xã hội"
  },
  {
    topic: 2,
    question: "Phan Châu Trinh đã sang Pháp vào năm 1911 để thực hiện mục tiêu nào?",
    answers: [
      "A. Tìm kiếm sự hỗ trợ quân sự chống Pháp",
      "B. Vận động cải cách ôn hòa và hợp tác với Pháp",
      "C. Thành lập Việt Nam Quang Phục Hội",
      "D. Phát động phong trào Đông Du"
    ],
    correct: 2 // Đáp án đúng là "B. Vận động cải cách ôn hòa và hợp tác với Pháp"
  },
  {
    topic: 2,
    question: "Lễ tang của Phan Châu Trinh vào năm 1926 có ý nghĩa như thế nào?",
    answers: [
      "A. Thể hiện sự kính trọng lớn của nhân dân đối với ông",
      "B. Là dịp tổ chức hoạt động tuyên truyền chống Pháp",
      "C. Đánh dấu sự kết thúc của phong trào Duy Tân",
      "D. Đánh dấu khởi đầu của phong trào Đông Du"
    ],
    correct: 1 // Đáp án đúng là "A. Thể hiện sự kính trọng lớn của nhân dân đối với ông"
  },
  {
    topic: 3,
    question: "Tại Đại hội V Quốc tế Cộng sản diễn ra từ ngày nào đến ngày nào?",
    answers: [
      "A. 17/6 - 8/7/1924",
      "B. 1/7 - 3/7/1924",
      "C. 23/6 - 1/7/1924",
      "D. 3/7 - 17/6/1924"
    ],
    correct: 1 // Đáp án đúng là "A. 17/6 - 8/7/1924"
  },
  {
    topic: 3,
    question: "Tại phiên họp nào trong Đại hội V, Nguyễn Ái Quốc nhấn mạnh mối liên hệ giữa cách mạng thuộc địa với giai cấp vô sản?",
    answers: [
      "A. Phiên họp 22",
      "B. Phiên họp 8",
      "C. Phiên họp 25",
      "D. Phiên họp 15"
    ],
    correct: 2 // Đáp án đúng là "B. Phiên họp 8"
  },
  {
    topic: 3,
    question: "Nguyễn Ái Quốc đã kêu gọi Quốc tế Cộng sản hỗ trợ điều gì cho nông dân trong phiên họp 25?",
    answers: [
      "A. Tổ chức và lãnh đạo để giải phóng",
      "B. Đầu tư tài chính cho nông dân",
      "C. Cung cấp vũ khí để kháng chiến",
      "D. Tuyên truyền cách mạng trong nông thôn"
    ],
    correct: 4 // Đáp án đúng là "D. Tuyên truyền cách mạng trong nông thôn"
  },  
  {
    topic: 4,
    question: "Biệt đội 'Con Nai' của Mỹ hỗ trợ ai trong cuộc chiến tranh nào?",
    answers: [
      "A. Việt Nam chống Pháp",
      "B. Việt Minh chống Nhật trong Thế chiến II",
      "C. Việt Minh chống Mỹ",
      "D. Việt Nam chống Trung Quốc"
    ],
    correct: 2 // Đáp án đúng là "B. Việt Minh chống Nhật trong Thế chiến II"
  },
  {
    topic: 4,
    question: "Ai đứng giữa Hồ Chí Minh và Võ Nguyên Giáp trong bức ảnh với các thành viên của biệt đội 'Con Nai'?",
    answers: [
      "A. Nguyễn Thị Minh Khai",
      "B. Trường Chinh",
      "C. Lê Duẩn",
      "D. Các thành viên biệt đội 'Con Nai'"
    ],
    correct: 4 // Đáp án đúng là "D. Các thành viên biệt đội 'Con Nai'"
  },
  {
    topic: 4,
    question: "Sự kiện chụp ảnh tại Tân Trào tháng 8 năm 1945 đánh dấu điều gì trong lịch sử Việt Nam?",
    answers: [
      "A. Sự thành lập Đảng Cộng sản Việt Nam",
      "B. Sự hợp tác giữa Việt Minh và Đồng Minh dẫn đến Cách mạng Tháng Tám",
      "C. Sự ra đời của Chính phủ Việt Nam Dân chủ Cộng hòa",
      "D. Sự kết thúc chiến tranh Việt Nam"
    ],
    correct: 2 // Đáp án đúng là "B. Sự hợp tác giữa Việt Minh và Đồng Minh dẫn đến Cách mạng Tháng Tám"
  },
  {
    topic: 5,
    question: "Đại hội XXII của Đảng Cộng sản Liên Xô diễn ra trong bối cảnh nào?",
    answers: [
      "A. Thế chiến II",
      "B. Chiến tranh Lạnh",
      "C. Thời kỳ phục hưng",
      "D. Cách mạng Tháng Tám"
    ],
    correct: 2 // Đáp án đúng là "B. Chiến tranh Lạnh"
  },
  {
    topic: 5,
    question: "Mối quan hệ giữa Việt Nam và Liên Xô trong cuộc đấu tranh giành độc lập và xây dựng chủ nghĩa xã hội được đánh giá như thế nào vào năm 1961?",
    answers: [
      "A. Không đáng kể",
      "B. Rạn nứt",
      "C. Hữu nghị vững mạnh",
      "D. Thoáng qua"
    ],
    correct: 3 // Đáp án đúng là "C. Hữu nghị vững mạnh"
  },
  {
    topic: 5,
    question: "Đại hội XXII của Đảng Cộng sản Liên Xô có ý nghĩa gì đối với công cuộc đấu tranh giải phóng dân tộc của Việt Nam?",
    answers: [
      "A. Làm suy yếu mối quan hệ với Liên Xô",
      "B. Củng cố mối quan hệ với Liên Xô và các nước xã hội chủ nghĩa",
      "C. Không có tác động gì",
      "D. Gây khó khăn trong việc xây dựng chủ nghĩa xã hội"
    ],
    correct: 2 // Đáp án đúng là "B. Củng cố mối quan hệ với Liên Xô và các nước xã hội chủ nghĩa"
  },{
    topic: 6,
    question: "Hiệp định Sơ bộ 6/3/1946 được ký kết giữa Việt Nam và nước nào?",
    answers: [
      "A. Hoa Kỳ",
      "B. Trung Quốc",
      "C. Pháp",
      "D. Nhật Bản"
    ],
    correct: 2 // Đáp án đúng là "C. Pháp"
  },
  {
    topic: 6,
    question: "Mục đích chính của Hiệp định Sơ bộ 1946 là gì?",
    answers: [
      "A. Tăng cường quân sự cho Việt Nam",
      "B. Tránh đối đầu quân sự và giữ hòa bình tạm thời",
      "C. Thúc đẩy mối quan hệ với các nước khác",
      "D. Giải quyết các vấn đề nội bộ của Việt Nam"
    ],
    correct: 2 // Đáp án đúng là "B. Tránh đối đầu quân sự và giữ hòa bình tạm thời"
  },
  {
    topic: 6,
    question: "Chủ tịch Hồ Chí Minh đã sử dụng chiến lược gì để thực hiện việc ký kết Hiệp định Sơ bộ?",
    answers: [
      "A. Sử dụng sức mạnh quân sự",
      "B. Thương lượng qua các cuộc họp",
      "C. Khéo léo dùng ngoại giao để giành thời gian",
      "D. Phát động các cuộc biểu tình"
    ],
    correct: 3 // Đáp án đúng là "C. Khéo léo dùng ngoại giao để giành thời gian"
  },
  {
    topic: 7,
    question: "Sự kiện Chủ tịch Hồ Chí Minh tiếp Đoàn đại biểu phong trào Hòa bình Pháp diễn ra vào ngày nào?",
    answers: [
      "A. 15/3/1954",
      "B. 15/3/1955",
      "C. 15/3/1960",
      "D. 15/3/1965"
    ],
    correct: 2 // Đáp án đúng là "B. 15/3/1955"
  },
  {
    topic: 7,
    question: "Sự kiện này thể hiện chính sách gì của Việt Nam?",
    answers: [
      "A. Chính sách quân sự hóa",
      "B. Chính sách đối ngoại hòa bình, độc lập",
      "C. Chính sách hội nhập kinh tế",
      "D. Chính sách đối đầu với các nước phương Tây"
    ],
    correct: 2 // Đáp án đúng là "B. Chính sách đối ngoại hòa bình, độc lập"
  },
  {
    topic: 7,
    question: "Chủ tịch Hồ Chí Minh đã bày tỏ điều gì trong buổi tiếp đoàn đại biểu phong trào Hòa bình Pháp?",
    answers: [
      "A. Lòng biết ơn và khẳng định sự ủng hộ của nhân dân Pháp",
      "B. Lời mời hợp tác quân sự",
      "C. Lời yêu cầu bồi thường chiến tranh",
      "D. Kêu gọi các nước khác ủng hộ Việt Nam"
    ],
    correct: 1 // Đáp án đúng là "A. Lòng biết ơn và khẳng định sự ủng hộ của nhân dân Pháp"
  },
  {
    topic: 8,
    question: "Sự kiện ký tuyên bố chung tại Hội nghị 81 Đảng Cộng sản và Công nhân quốc tế diễn ra vào tháng nào và năm nào?",
    answers: [
      "A. Tháng 11/1959",
      "B. Tháng 11/1960",
      "C. Tháng 12/1960",
      "D. Tháng 10/1961"
    ],
    correct: 2 // Đáp án đúng là "B. Tháng 11/1960"
  },
  {
    topic: 8,
    question: "Sự kiện này thể hiện điều gì trong quan hệ của Việt Nam với các đảng cộng sản toàn cầu?",
    answers: [
      "A. Sự đối đầu và phân hóa",
      "B. Sự gắn bó với mục tiêu vì hòa bình và chủ nghĩa xã hội",
      "C. Sự ủng hộ của các nước phương Tây",
      "D. Sự tách rời khỏi phong trào cộng sản thế giới"
    ],
    correct: 2 // Đáp án đúng là "B. Sự gắn bó với mục tiêu vì hòa bình và chủ nghĩa xã hội"
  },
  {
    topic: 8,
    question: "Chủ tịch Hồ Chí Minh đã khẳng định điều gì qua sự kiện ký tuyên bố chung tại hội nghị này?",
    answers: [
      "A. Vai trò của Việt Nam trong việc xây dựng chủ nghĩa tư bản",
      "B. Vị thế quốc tế của Việt Nam và sự ủng hộ đối với cuộc kháng chiến chống Mỹ",
      "C. Tăng cường quan hệ quân sự với các nước phương Tây",
      "D. Thúc đẩy các phong trào phản chiến tại Mỹ"
    ],
    correct: 2 // Đáp án đúng là "B. Vị thế quốc tế của Việt Nam và sự ủng hộ đối với cuộc kháng chiến chống Mỹ"
  },
  {
    topic: 9,
    question: "Cuộc biểu tình chống chiến tranh Việt Nam tại Vancouver diễn ra vào năm nào?",
    answers: [
      "A. 1965",
      "B. 1968",
      "C. 1970",
      "D. 1975"
    ],
    correct: 2 // Đáp án đúng là "B. 1968"
  },
  {
    topic: 9,
    question: "Mục tiêu chính của cuộc biểu tình là gì?",
    answers: [
      "A. Yêu cầu chính phủ Canada tăng cường hỗ trợ cho cuộc chiến tranh",
      "B. Đòi hỏi chính phủ Canada chấm dứt hỗ trợ chiến tranh và rút khỏi các cam kết quân sự với Hoa Kỳ",
      "C. Khuyến khích tham gia chiến tranh của người dân Canada",
      "D. Đề xuất tăng cường quan hệ với các nước xã hội chủ nghĩa"
    ],
    correct: 2 // Đáp án đúng là "B. Đòi hỏi chính phủ Canada chấm dứt hỗ trợ chiến tranh và rút khỏi các cam kết quân sự với Hoa Kỳ"
  },
  {
    topic: 9,
    question: "Cuộc biểu tình tại Vancouver thể hiện điều gì về tinh thần của người dân Canada?",
    answers: [
      "A. Sự ủng hộ đối với các chính sách quân sự của chính phủ",
      "B. Tinh thần nhân đạo và sự đóng góp vào phong trào phản chiến toàn cầu",
      "C. Khát vọng tham gia vào các cuộc chiến tranh quốc tế",
      "D. Sự thờ ơ với các vấn đề quốc tế"
    ],
    correct: 2 // Đáp án đúng là "B. Tinh thần nhân đạo và sự đóng góp vào phong trào phản chiến toàn cầu"
  },
  {
    topic: 10,
    question: "Hiệp định Paris được ký kết vào ngày nào?",
    answers: [
      "A. 27/1/1972",
      "B. 27/1/1973",
      "C. 29/3/1973",
      "D. 30/4/1975"
    ],
    correct: 2 // Đáp án đúng là "B. 27/1/1973"
  },
  {
    topic: 10,
    question: "Nguyễn Thị Bình đóng vai trò gì trong việc ký kết Hiệp định Paris?",
    answers: [
      "A. Là Thủ tướng Chính phủ Cách mạng lâm thời",
      "B. Là Bộ trưởng Bộ Ngoại giao, đại diện cho tiếng nói và quyền lợi của nhân dân miền Nam",
      "C. Là đại diện của Việt Nam Dân chủ Cộng hòa",
      "D. Là lãnh đạo quân đội miền Bắc"
    ],
    correct: 2 // Đáp án đúng là "B. Là Bộ trưởng Bộ Ngoại giao, đại diện cho tiếng nói và quyền lợi của nhân dân miền Nam"
  },
  {
    topic: 10,
    question: "Hiệp định Paris đã công nhận điều gì về hai miền Việt Nam?",
    answers: [
      "A. Công nhận sự thống nhất của Việt Nam dưới một chính quyền duy nhất",
      "B. Công nhận thực tế về sự tồn tại của hai chính quyền riêng biệt ở miền Bắc và miền Nam",
      "C. Công nhận quyền tự quyết của nhân dân miền Bắc",
      "D. Không đề cập đến sự tồn tại của hai chính quyền"
    ],
    correct: 2 // Đáp án đúng là "B. Công nhận thực tế về sự tồn tại của hai chính quyền riêng biệt ở miền Bắc và miền Nam"
  },
  {
    topic: 11,
    question: "Nhà máy Thủy điện Hòa Bình được xây dựng trong thời gian nào?",
    answers: [
      "A. 1975 - 1980",
      "B. 1979 - 1994",
      "C. 1980 - 1985",
      "D. 1985 - 1990"
    ],
    correct: 2 // Đáp án đúng là "B. 1979 - 1994"
  },
  {
    topic: 11,
    question: "Nhà máy Thủy điện Hòa Bình có ý nghĩa gì trong mối quan hệ Việt - Xô?",
    answers: [
      "A. Là biểu tượng của chiến tranh",
      "B. Là công trình đánh dấu sự hợp tác trong lĩnh vực quân sự",
      "C. Là công trình lịch sử và có ý nghĩa sâu sắc trong mối quan hệ hữu nghị, góp phần vào sự nghiệp phát triển kinh tế và ổn định đời sống người dân",
      "D. Là dự án đầu tiên của Liên Xô tại Việt Nam"
    ],
    correct: 3 // Đáp án đúng là "C. Là công trình lịch sử và có ý nghĩa sâu sắc trong mối quan hệ hữu nghị, góp phần vào sự nghiệp phát triển kinh tế và ổn định đời sống người dân"
  },
  {
    topic: 11,
    question: "Ai đã tham gia vào việc xây dựng Nhà máy Thủy điện Hòa Bình?",
    answers: [
      "A. Chỉ có các chuyên gia Việt Nam",
      "B. Chỉ có các chuyên gia Liên Xô",
      "C. Hàng ngàn chuyên gia Liên Xô và Việt Nam đã làm việc cật lực để hoàn thành dự án",
      "D. Các chuyên gia từ nhiều quốc gia khác nhau"
    ],
    correct: 3 // Đáp án đúng là "C. Hàng ngàn chuyên gia Liên Xô và Việt Nam đã làm việc cật lực để hoàn thành dự án"
  },
  {
    topic: 12,
    question: "Hiệp ước hữu nghị và hợp tác Việt - Lào được ký kết vào ngày nào?",
    answers: [
      "A. 18/7/1975",
      "B. 18/7/1977",
      "C. 18/7/1979",
      "D. 18/7/1980"
    ],
    correct: 2 // Đáp án đúng là "B. 18/7/1977"
  },
  {
    topic: 12,
    question: "Mối quan hệ giữa Việt Nam và Lào được khẳng định qua sự kiện nào?",
    answers: [
      "A. Ký kết Hiệp ước hòa bình",
      "B. Ký kết Hiệp ước hữu nghị và hợp tác",
      "C. Tổ chức hội nghị quốc tế",
      "D. Mở cửa biên giới"
    ],
    correct: 2 // Đáp án đúng là "B. Ký kết Hiệp ước hữu nghị và hợp tác"
  },
  {
    topic: 12,
    question: "Hiệp ước hữu nghị và hợp tác Việt - Lào có vai trò gì trong mối quan hệ giữa hai nước?",
    answers: [
      "A. Tạo nền tảng pháp lý cho các hoạt động hợp tác toàn diện về nhiều lĩnh vực",
      "B. Chỉ tập trung vào hợp tác quốc phòng",
      "C. Không có ý nghĩa đặc biệt",
      "D. Giới hạn sự hợp tác về kinh tế"
    ],
    correct: 1 // Đáp án đúng là "A. Tạo nền tảng pháp lý cho các hoạt động hợp tác toàn diện về nhiều lĩnh vực"
  },
  {
    topic: 13,
    question: "Sự kiện Việt Nam gia nhập Liên hợp quốc diễn ra vào ngày nào?",
    answers: [
      "A. 20/9/1975",
      "B. 20/9/1976",
      "C. 20/9/1977",
      "D. 20/9/1978"
    ],
    correct: 3 // Đáp án đúng là "C. 20/9/1977"
  },
  {
    topic: 13,
    question: "Ai là đại diện của Việt Nam tham dự buổi lễ kéo cờ tại Liên hợp quốc?",
    answers: [
      "A. Chủ tịch Hồ Chí Minh",
      "B. Thủ tướng Phạm Văn Đồng",
      "C. Phó Thủ tướng, Bộ trưởng Bộ Ngoại giao Nguyễn Duy Trinh",
      "D. Đại sứ Đặng Thế Phong"
    ],
    correct: 3 // Đáp án đúng là "C. Phó Thủ tướng, Bộ trưởng Bộ Ngoại giao Nguyễn Duy Trinh"
  },
  {
    topic: 13,
    question: "Sự kiện Việt Nam gia nhập Liên hợp quốc có ý nghĩa gì đối với đất nước?",
    answers: [
      "A. Thể hiện sự công nhận của cộng đồng quốc tế đối với chủ quyền và sự độc lập của Việt Nam",
      "B. Đánh dấu một cuộc chiến tranh mới",
      "C. Không có ảnh hưởng gì đáng kể",
      "D. Chỉ là một sự kiện mang tính hình thức"
    ],
    correct: 1 // Đáp án đúng là "A. Thể hiện sự công nhận của cộng đồng quốc tế đối với chủ quyền và sự độc lập của Việt Nam"
  },
  {
    topic: 14,
    question: "Cuộc hội đàm giữa Tổng Bí thư Nguyễn Phú Trọng và Tổng thống Joe Biden diễn ra vào ngày nào?",
    answers: [
      "A. 10/09/2022",
      "B. 10/09/2023",
      "C. 10/09/2024",
      "D. 10/09/2021"
    ],
    correct: 2 // Đáp án đúng là "B. 10/09/2023"
  },
  {
    topic: 14,
    question: "Một trong những cam kết của Hoa Kỳ đối với Việt Nam trong cuộc hội đàm là gì?",
    answers: [
      "A. Hỗ trợ phát triển quân sự",
      "B. Hỗ trợ phát triển giáo dục, đặc biệt trong khoa học công nghệ và y tế",
      "C. Tăng cường xuất khẩu hàng hóa",
      "D. Đầu tư vào ngành công nghiệp giải trí"
    ],
    correct: 2 // Đáp án đúng là "B. Hỗ trợ phát triển giáo dục, đặc biệt trong khoa học công nghệ và y tế"
  },
  {
    topic: 14,
    question: "Nội dung nào được nhất trí tăng cường hợp tác trong cuộc hội đàm?",
    answers: [
      "A. Hợp tác trong lĩnh vực văn hóa và thể thao",
      "B. Hợp tác trong lĩnh vực năng lượng tái tạo và chống biến đổi khí hậu",
      "C. Hợp tác trong lĩnh vực ngân hàng và tài chính",
      "D. Hợp tác trong lĩnh vực nông nghiệp và lâm nghiệp"
    ],
    correct: 2 // Đáp án đúng là "B. Hợp tác trong lĩnh vực năng lượng tái tạo và chống biến đổi khí hậu"
  },
  {
    topic: 15,
    question: "Việt Nam được bầu làm Ủy viên không thường trực Hội đồng Bảo an Liên hợp quốc vào ngày nào?",
    answers: [
      "A. 6/6/2018",
      "B. 6/6/2019",
      "C. 6/6/2020",
      "D. 6/6/2021"
    ],
    correct: 2 // Đáp án đúng là "B. 6/6/2019"
  },
  {
    topic: 15,
    question: "Nhiệm kỳ 2020-2021 của Việt Nam trong vai trò Ủy viên không thường trực Hội đồng Bảo an Liên hợp quốc thể hiện điều gì?",
    answers: [
      "A. Sự tăng cường hợp tác quân sự với các nước lớn",
      "B. Sự khẳng định vị thế quốc tế của Việt Nam và cam kết đóng góp cho hòa bình toàn cầu",
      "C. Sự phát triển kinh tế nhanh chóng của Việt Nam",
      "D. Sự thay đổi trong chính sách đối ngoại của Việt Nam"
    ],
    correct: 2 // Đáp án đúng là "B. Sự khẳng định vị thế quốc tế của Việt Nam và cam kết đóng góp cho hòa bình toàn cầu"
  },
  {
    topic: 15,
    question: "Việc Việt Nam trở thành Ủy viên không thường trực Hội đồng Bảo an Liên hợp quốc nhiệm kỳ 2020–2021 được coi là thành tựu gì trong chính sách đối ngoại của Việt Nam?",
    answers: [
      "A. Thành tựu trong chính sách đối ngoại đơn phương",
      "B. Thành tựu trong chính sách đối ngoại đa phương",
      "C. Thành tựu trong việc gia tăng sức mạnh quân sự",
      "D. Thành tựu trong việc gia tăng xuất khẩu"
    ],
    correct: 2 // Đáp án đúng là "B. Thành tựu trong chính sách đối ngoại đa phương"
  },

];

let currentQuestionIndex = 0;
let currentTopicQuestions = [];
let daDung = 0;
function loadQuestionsByTopic(tpic) {
  currentQuestionIndex = 0; // Reset câu hỏi
  daDung = 0;
  currentTopicQuestions = questions.filter(q => q.topic == tpic); // Lọc câu hỏi theo topic
  
  if (currentTopicQuestions.length > 0) {
    loadQuestion(currentTopicQuestions[currentQuestionIndex]);
  } else {
    
  }
}
function loadQuestion(question) {
  const noiDungCauHoi = document.querySelector('.noidungcauhoi');
  const cl1 = document.getElementById('cl1');
  const cl2 = document.getElementById('cl2');
  const cl3 = document.getElementById('cl3');
  const cl4 = document.getElementById('cl4');

  // Cập nhật nội dung câu hỏi và đáp án
  noiDungCauHoi.textContent = question.question;
  cl1.textContent = question.answers[0];
  cl2.textContent = question.answers[1];
  cl3.textContent = question.answers[2];
  cl4.textContent = question.answers[3];
}

// Hàm chuyển câu hỏi tiếp theo
function nextQuestion() {
  if (currentQuestionIndex < currentTopicQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentTopicQuestions[currentQuestionIndex]);
  } else {
    addt()
  }
}

// Lấy tất cả các nút câu trả lời
const answerButtons = document.querySelectorAll('.da');

// Lắng nghe sự kiện click cho từng nút
answerButtons.forEach(button => {
  button.addEventListener('click', function() {
    const selectedValue = parseInt(this.value); // Lấy giá trị của nút bấm
    const thongbao = document.querySelector('.thongbao'); 
    if (selectedValue == currentTopicQuestions[currentQuestionIndex].correct) {
      // Hiển thị thông báo
      daDung++;
      CapNhatThongBao("T")
      thongbao.classList.remove('d-none');
      // Ẩn thông báo sau 2 giây
      setTimeout(() => {
        thongbao.classList.add('d-none');
        nextQuestion()
      }, 1500);
    }
    else {
      // Hiển thị thông báo
      CapNhatThongBao("F")
      thongbao.classList.remove('d-none');
      // Ẩn thông báo sau 2 giây
      setTimeout(() => {
        thongbao.classList.add('d-none');
        nextQuestion()
      }, 1500);
    }
  });
});

function CapNhatThongBao(string){
  const tb = document.querySelector('.hientb');
  const checkm = document.querySelector('.checkmark');
  const checkx = document.querySelector('.checkx');
  const kq = document.querySelector('.kq');
  const dapandung = document.querySelector('.checktrue');
  if (string=="T"){
    tb.textContent = "Đáp án đúng";
    checkx.classList.add('d-none');
    checkm.classList.remove('d-none');
  }
  else{
    tb.textContent = "Đáp án sai";
    checkm.classList.add('d-none');
    checkx.classList.remove('d-none');
  }
  dapandung.textContent = "Bạn đã đúng "+ daDung +"/3";
  kq.textContent = "Bạn đã đúng "+ daDung +"/3";
  
}
// Gọi hàm này để nạp câu hỏi đầu tiên theo topic
loadQuestionsByTopic(1); // Mặc định là topic 1
function offkhung(){
  const khung = document.querySelector('.khung');  
  if (khung.classList.contains('d-none')) {
    khung.classList.remove('d-none'); // Nếu có 'd-none' thì xóa
  } else {
    khung.classList.add('d-none'); // Nếu không có thì thêm
  }
}
//video
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("onvideo");
  const out = document.getElementById("thoat");
  const entity = document.getElementById("box-and-text");
  const videoElement = document.getElementById("s");

  // Toggle visibility và play/pause video khi bấm nút
  button.addEventListener("click", () => {
    const isVisible = entity.getAttribute("visible");
    entity.setAttribute("visible", !isVisible);
    offkhung();
    if (!isVisible) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  });
  out.addEventListener("click", () => {
    const isVisible = entity.getAttribute("visible");
    if (isVisible) {
      entity.setAttribute("visible", !isVisible);
      offkhung();
      videoElement.pause();
    }
  });
});


