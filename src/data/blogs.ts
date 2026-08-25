export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // Nội dung HTML
    date: string;
    author: string;
    thumbnail: string;
}

export const BLOGS: BlogPost[] = [
    // --- 3 BÀI CŨ (GIỮ NGUYÊN) ---
    {
        id: "1",
        slug: "goc-nho-man-khe-khoang-lang",
        title: "Góc nhỏ Mạn Khê: Nơi thời gian ngừng lại bên thềm cửa",
        date: "20/01/2026",
        author: "Mạn Khê",
        thumbnail: "/ManxiImage/service1.png",
        excerpt: "Giữa Hóc Môn nhộn nhịp, Manxi chọn cho mình một lối đi riêng. Không ồn ào, không vội vã, chỉ có sự tĩnh lặng và riêng tư tuyệt đối...",
        content: `
      <p>Chào bạn, người đang tìm kiếm một chút bình yên,</p>
      <p>Người ta hay hỏi mình: <em>"Tại sao lại đặt tên là Manxi (Mạn Khê)?"</em>.</p>
      <p>Trong tiếng Hán, <strong>"Mạn" (慢)</strong> nghĩa là Chậm. Giữa guồng quay hối hả của cơm áo gạo tiền, ai cũng bị cuốn đi nhanh quá. Nhanh đến mức quên mất bản thân mình đang mệt, quên mất lâu rồi chưa có một giấc ngủ ngon.</p>
      <p>Manxi ra đời với mong muốn trở thành một <strong>"dấu lặng"</strong> trong bản nhạc cuộc đời vội vã ấy.</p>
      <h3>Tại sao lại là "Private 1:1"?</h3>
      <p>Manxi không phải là một Spa công nghiệp với hàng chục chiếc giường san sát nhau. Chúng mình chọn mô hình <strong>Private 1:1</strong> - nơi mà trong suốt 60, 90 hay 120 phút liệu trình, không gian này là của riêng bạn.</p>
      <ul>
        <li>Không tiếng ồn ào trò chuyện của người lạ.</li>
        <li>Không tiếng máy sấy tóc o o bên tai khi đang thiu thiu ngủ.</li>
        <li>Chỉ có tiếng nhạc thiền, mùi thảo mộc ấm nồng và đôi bàn tay chăm sóc tận tâm.</li>
      </ul>
      <p>Đến với góc nhỏ Mạn Khê, bạn không cần phải "gồng" mình xã giao với ai cả. Hãy cứ buông bỏ điện thoại, nhắm mắt lại và để chúng mình vỗ về những mệt mỏi của bạn nhé.</p>
    `
    },
    {
        id: "2",
        slug: "bi-mat-ngoc-bich-duong-sinh",
        title: "Bí mật của Ngọc Bích: Khi đá quý chạm vào làn da",
        date: "22/01/2026",
        author: "Manxi Team",
        thumbnail: "/ManxiImage/service10.jpg",
        excerpt: "Không chỉ là trang sức, Ngọc Bích (Jade) từ lâu đã được giới quý tộc Á Đông xem như 'thần dược' cho nhan sắc. Tại Manxi, chúng tôi đưa nó vào liệu trình chữa lành.",
        content: `
      <p>Bạn có để ý trong các gói trị liệu cao cấp như <strong>"Hành trình NGỌC"</strong> hay <strong>"Hành trình AN"</strong>, Manxi luôn sử dụng thanh lăn hoặc đá Ngọc Bích không?</p>
      <p>Đó không phải là sự ngẫu nhiên, mà là sự kết hợp tinh tế của Y học cổ truyền.</p>
      <h3>Đánh thức vẻ đẹp tiềm ẩn</h3>
      <p>Ngọc Bích tự nhiên có tính hàn (mát). Khi lướt trên da mặt đang ấm nóng, sự chênh lệch nhiệt độ này giúp:</p>
      <ul>
        <li><strong>Se khít lỗ chân lông:</strong> Mang lại làn da mịn màng hơn.</li>
        <li><strong>Đả thông kinh lạc:</strong> Các động tác "cạo gió" nhẹ nhàng bằng ngọc giúp kích thích tuần hoàn máu dưới da, làm da hồng hào rạng rỡ.</li>
        <li><strong>Nâng cơ tự nhiên:</strong> Kỹ thuật massage đẩy ngọc giúp định hình lại các đường nét gương mặt, giảm chảy xệ mà không cần xâm lấn.</li>
      </ul>
      <h3>Cảm giác "chạm" vào sự xa xỉ</h3>
      <p>Cảm giác viên ngọc mát lạnh trượt đi những âu lo trên trán, đi qua vùng thái dương đang căng cứng... thực sự là một trải nghiệm "gây nghiện". Tại Manxi, chúng mình nâng niu khuôn mặt bạn như nâng niu chính viên ngọc quý ấy.</p>
      <p>Hãy thử một lần để Ngọc Bích đánh thức vẻ đẹp rạng ngời của bạn đón Tết này nhé!</p>
    `
    },
    {
        id: "3",
        slug: "mat-ngu-dau-dau-goi-dau-duong-sinh",
        title: "Mất ngủ, Đau đầu & Lý do bạn cần một buổi Gội đầu dưỡng sinh",
        date: "25/01/2026",
        author: "Chuyên gia Manxi",
        thumbnail: "/ManxiImage/service2.png",
        excerpt: "Bạn có biết da đầu là nơi tập trung rất nhiều dây thần kinh? Khi đầu căng thẳng, cả cơ thể sẽ mệt nhoài. Và gội đầu dưỡng sinh chính là liều thuốc giải.",
        content: `
      <p>Có bao giờ bạn nằm trằn trọc đến 2-3 giờ sáng, đầu óc cứ quay cuồng với những suy nghĩ không tên? Hay những cơn đau nửa đầu cứ âm ỉ mỗi khi trời trở gió?</p>
      <p>Đó là lúc cơ thể đang "biểu tình" đòi được nghỉ ngơi đấy.</p>
      <h3>Gội đầu dưỡng sinh khác gì gội thường?</h3>
      <p>Nếu gội đầu bình thường chỉ tập trung làm sạch tóc bằng móng tay (dễ gây xước da đầu), thì <strong>Gội đầu dưỡng sinh tại Manxi</strong> tập trung vào <strong>Huyệt Đạo</strong> và <strong>Kinh Lạc</strong>.</p>
      <p>Kỹ thuật viên sẽ dùng phần thịt mềm của ngón tay để day ấn các huyệt vị quan trọng như:</p>
      <ul>
        <li><strong>Huyệt Bách Hội (đỉnh đầu):</strong> Giúp khai thông dương khí, giảm đau đầu.</li>
        <li><strong>Huyệt Phong Trì (sau gáy):</strong> Giảm ngay triệu chứng mỏi cổ, hoa mắt.</li>
        <li><strong>Vùng Thái Dương:</strong> Xua tan căng thẳng thần kinh.</li>
      </ul>
      <h3>Canh thang thảo dược - Mùi hương chữa lành</h3>
      <p>Không dùng hóa chất tẩy rửa mạnh, Manxi sử dụng nước thảo dược nấu tươi mỗi ngày (Bồ kết, Hương nhu, Mần trầu...). Mùi hương ấm nồng của nước lá không chỉ nuôi dưỡng tóc mềm mượt mà còn xoa dịu hệ thần kinh, đưa bạn vào giấc ngủ sâu một cách tự nhiên nhất.</p>
      <p>Đừng để cơn đau đầu làm phiền bạn thêm nữa. Ghé Mạn Khê, gội sạch ưu phiền ngay thôi.</p>
    `
    },

    // --- 3 BÀI MỚI THÊM VÀO ---

    {
        id: "4",
        slug: "nghe-thuat-lay-ray-tai-dai-loan",
        title: "Nghệ thuật Chăm sóc tai chuẩn Đài Loan: Khi đôi tai cũng cần được 'thở'",
        date: "28/01/2026",
        author: "Manxi Team",
        thumbnail: "/ManxiImage/taiwan.jpg", // Tìm ảnh lông ngỗng/dụng cụ lấy ráy tai
        excerpt: "Bạn đã bao giờ trải nghiệm cảm giác 'rùng mình' sung sướng khi chiếc lông ngỗng mềm mại lướt nhẹ trong tai? Đó là Ear Spa - đặc sản chỉ có tại Manxi.",
        content: `
      <p>Người Việt mình thường chỉ có thói quen ngoáy tai cho sạch. Nhưng ở Đài Loan hay Trung Hoa, <strong>Lấy ráy tai (Ear Picking)</strong> được nâng tầm lên thành một bộ môn nghệ thuật thư giãn đỉnh cao.</p>
      <h3>Hơn cả việc làm sạch</h3>
      <p>Tại Manxi, bước <em>"Chăm sóc & Vệ sinh tai chuyên sâu"</em> không chỉ đơn thuần là lấy đi bụi bẩn. Đó là một quy trình kích thích xúc giác đầy tinh tế:</p>
      <ul>
        <li><strong>Lông ngỗng & Lông công:</strong> Sự mềm mại của lông vũ khi xoay nhẹ trong ống tai tạo ra những rung động kích thích dây thần kinh, gây ra cảm giác "ASMR" (phản ứng cực khoái cảm giác) chạy dọc sống lưng.</li>
        <li><strong>Âm thoa (Tuning Fork):</strong> Tiếng rung ngân nga của âm thoa giúp trấn tĩnh thần kinh, đưa bạn vào trạng thái thiền định ngay lập tức.</li>
      </ul>
      <h3>Tại sao bạn sẽ "nghiện" món này?</h3>
      <p>Tai là nơi tập trung nhiều huyệt đạo liên quan đến thận và hệ thần kinh. Massage tai đúng cách giúp giảm stress cực nhanh, cải thiện thính lực và tạo cảm giác nhẹ bẫng cho vùng đầu.</p>
      <p>Nếu chưa từng thử, hãy chọn gói <strong>Hành trình AN</strong> hoặc <strong>DƯỠNG</strong> để Manxi giúp đôi tai bạn được "thở" nhé!</p>
    `
    },
    {
        id: "5",
        slug: "dan-van-phong-dau-moi-vai-gay",
        title: "Dân văn phòng & Nỗi ám ảnh Vai Gáy: Đừng để cơ thể 'gào thét' mới chịu lắng nghe",
        date: "02/02/2026",
        author: "Chuyên gia Manxi",
        thumbnail: "/ManxiImage/service6.jpg", // Ảnh massage cổ vai gáy
        excerpt: "Ngồi máy tính 8 tiếng/ngày, cúi đầu lướt điện thoại liên tục... Cổ vai gáy của bạn đang chịu áp lực tương đương một bao gạo 20kg đấy!",
        content: `
      <p>Chúng ta thường hào phóng thời gian cho công việc, cho sếp, cho deadline, nhưng lại keo kiệt thời gian cho chính cơ thể mình. Chỉ đến khi quay đầu thấy nhói, nhấc tay thấy mỏi, ta mới giật mình nhận ra: <strong>Cổ Vai Gáy đã "biểu tình" từ lâu.</strong></p>
      <h3>Hệ lụy của "bệnh văn phòng"</h3>
      <p>Sự tắc nghẽn lưu thông máu ở vùng cổ vai gáy không chỉ gây đau nhức tại chỗ. Nó là nguyên nhân chính dẫn đến:</p>
      <ul>
        <li>Máu không lên đủ não gây thiếu máu não, hay quên, chóng mặt.</li>
        <li>Tê bì xuống hai cánh tay và ngón tay.</li>
        <li>Gương mặt kém sắc, da sạm do khí huyết ứ trệ.</li>
      </ul>
      <h3>Giải pháp "Gỡ rối" từ Manxi</h3>
      <p>Trong gói <strong>Dưỡng Sinh Vai Gáy (60 phút)</strong>, Manxi không chỉ xoa bóp bên ngoài. Kỹ thuật viên sẽ dùng lực sâu để <em>đả thông các bó cơ đang co cứng</em> (Knot muscle), kết hợp chườm thảo dược ấm để làm mềm cơ.</p>
      <p>Đừng đợi đến khi không thể xoay cổ được nữa mới đi chữa trị. Hãy bảo dưỡng "bộ máy" cơ thể định kỳ để làm việc hiệu quả hơn bạn nhé.</p>
    `
    },
    {
        id: "6",
        slug: "hen-ho-voi-chinh-minh",
        title: "Hẹn hò với chính mình: 120 phút tắt điện thoại và tái tạo năng lượng",
        date: "05/02/2026",
        author: "Mạn Khê",
        thumbnail: "/ManxiImage/banner3.webp", // Ảnh cô gái đang thư giãn/uống trà
        excerpt: "Lần cuối cùng bạn dành trọn vẹn 2 tiếng đồng hồ chỉ để... không làm gì cả là khi nào? Tại Manxi, chúng mình gọi đó là 'Nghi thức thương mình'.",
        content: `
      <p>Chúng ta đang sống trong một thời đại "bội thực kết nối". Điện thoại ting ting mỗi phút, email công việc, tin nhắn nhóm chat... Tâm trí bạn lúc nào cũng trong trạng thái "Online".</p>
      <p>Vậy, <strong>Offline</strong> một chút thì sao?</p>
      <h3>Hành trình MẠN - Sống chậm lại một nhịp</h3>
      <p>Gói dịch vụ <strong>Hành trình MẠN (120 phút)</strong> của Manxi được thiết kế không chỉ để làm đẹp, mà để bạn tập cách "ngắt kết nối" với thế giới bên ngoài và "kết nối" lại với chính mình.</p>
      <ul>
        <li>Tắt điện thoại, gửi lại quầy lễ tân.</li>
        <li>Thả mình trên chiếc giường AI thông minh, cảm nhận từng nhịp rung massage lưng.</li>
        <li>Lắng nghe tiếng chuông xoay Tây Tạng (Singing Bowl) để lọc sạch tạp âm trong tâm trí.</li>
      </ul>
      <p>Đây không phải là sự lãng phí thời gian. Đây là lúc bạn sạc lại cục pin năng lượng đã cạn kiệt. Để khi bước ra khỏi cánh cửa Manxi, bạn lại là một phiên bản tươi mới hơn, rạng rỡ hơn và bình an hơn.</p>
      <p>Cuối tuần này, hãy thử mời bản thân một cái hẹn tại Mạn Khê nhé!</p>
    `
    }
];
