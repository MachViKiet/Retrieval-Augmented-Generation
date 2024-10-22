import { Box, Breadcrumbs, Button, Link, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import MuiTable from '~/components/MuiTable/MuiTable';
import {renderControlledSwitches} from '~/components/MuiTable/cell-renderers/switch'
import { useDispatch } from 'react-redux';
import { navigate_subnav, navigate as sidebarAction } from '~/store/actions/navigateActions'
import Documents from '~/components/Documents/Documents';
import Block from '~/components/Block';
import { renderTableAction } from '~/components/MuiTable/MuiTableAction';

function DatasetDetail() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [scroll, setScroll] = useState(null)
  const handleClick = () => {
    navigate('/knowledge_bases/student_handbook')
  }

  useEffect(() => {
    document.title = 'Chatbot - Quản Lý Tri Thức - Tài Liệu'
    dispatch(sidebarAction({index: 346}))
    dispatch(navigate_subnav({index: 0, openSubSidebar : true}))
    setScroll(0)
    // return (
    //   dispatch(sidebarAction({index: null}))
    // )
  })

  function createData(id, chunk, page_number ,enable, action) {
    return { id, chunk,page_number, enable ,action};
  }

  const rows = [
    createData(Math.floor(10000000 + Math.random() * 90000000),`QUY CHẾ ĐÀO TẠO TRÌNH ĐỘ ĐẠI HỌC 
      TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN, ĐHQG-HCM 
      (Ban hành kèm theo Quyết định số 1175/QĐ-KHTN ngày 24/9/2021 
      của Hiệu trưởng Trường Đại học Khoa học tự nhiên, ĐHQG-HCM)`, 2, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`Chương I 
      NHỮNG QUY ĐỊNH CHUNG`,1 ,true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`Điều 1.  Phạm vi điều chỉnh và đối tượng áp dụng 
      1.  Quy chế này quy định chung về tổ chức và quản lý đào tạo trình độ 
      đại  học theo phương thức đào tạo  tín  chỉ  của  Trường Đại  học  Khoa  học  Tự 
      nhiên, Đại học Quốc Gia Thành Phố Hồ Chí Minh (sau đây gọi tắt là Trường) 
      bao gồm: Chương trình đào tạo và thời gian học tập; hình thức và phương thức 
      tổ chức đào tạo; lập kế hoạch và tổ chức giảng dạy; đánh giá kết quả học tập và 
      cấp bằng tốt nghiệp; những quy định khác đối với sinh viên.  
      2.  Quy chế này áp dụng đối với sinh viên đại học hệ chính quy các khoá 
      đào tạo, các đơn vị, cá nhân thuộc Trường có liên quan trong đào tạo trình độ 
      đại học theo phương thức đào tạo tín chỉ.  
      3.  Quy chế này là căn cứ để Trường xây dựng và ban hành các văn bản 
      quy định cụ thể liên quan đến tổ chức và quản lý đào tạo trình độ đại học hệ 
      chính quy theo phương thức đào tạo tín chỉ.`, 1 , true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
        Điều 2.  Chương trình đào tạo và thời gian học tập 
      1.  Chương trình đào tạo được xây dựng theo đơn vị tín chỉ, cấu trúc từ 
      các môn học hoặc học phần (sau đây gọi chung là học phần), trong đó phải có 
      đủ  các  học  phần  bắt  buộc và đáp ứng  chuẩn chương trình đào tạo  theo  quy 
      định hiện hành của Bộ Giáo dục và Đào tạo. Trong trường hợp đào tạo song 
      ngành hoặc ngành chính - ngành phụ, chương trình đào tạo phải thể hiện rõ 
      khối lượng học tập chung và riêng theo từng ngành. 
      2.  Chương trình đào tạo là những thông tin cơ bản mà sinh viên cần nắm 49  
      vững trong quá trình học tập, bao gồm: trình độ đào tạo, mục tiêu đào tạo, đối 
      tượng đào tạo,  chuẩn đầu  ra  kiến  thức,  kỹ  năng, thái độ,  trách  nhiệm  nghề 
      nghiệp của sinh viên khi tốt nghiệp; khối lượng kiến thức, cấu trúc của chương 
      trình đào tạo; khối lượng kiến thức lý thuyết, thực hành, thực tập của các học 
      phần; kế hoạch đào tạo theo thời gian thiết kế; phương pháp và hình thức đánh 
      giá đối  với  học  phần; điều  kiện  tốt  nghiệp; các điều  kiện  thực  hiện chương 
      trình.`, 1, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
          3.  Chương trình đào tạo bao gồm khối kiến thức giáo dục đại cương và 
      giáo dục chuyên nghiệp. Khối kiến thức giáo dục đại cương nhằm trang bị cho 
      sinh viên nền học vấn rộng; có thế giới quan khoa học và nhân sinh quan đúng 
      đắn; hiểu biết về tự nhiên, xã hội và con người; nắm vững phương pháp tư duy 
      khoa học; có đạo đức, nhận thức trách nhiệm công dân; có năng lực tham gia 
      xây dựng và bảo vệ đất nước, trong đó các học phần bắt buộc phải có theo quy 
      định của Bộ Giáo dục và Đào tạo bao gồm: lý luận chính trị, pháp luật, giáo dục 
      thể  chất,  giáo  dục  quốc  phòng  -  an ninh theo quy định  hiện  hành.  Khối  kiến 
      thức giáo dục chuyên nghiệp được thể hiện theo 2 nhóm gồm nhóm kiến thức 
      cơ sở ngành và nhóm kiến thức chuyên ngành, nhằm cung cấp cho sinh viên 
      những kiến thức và kỹ năng nghề nghiệp ban đầu cần thiết.`, 2, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
          4.  Nội dung, chuẩn đầu ra của chương trình đào tạo áp dụng chung đối 
      với các hình thức, phương thức tổ chức đào tạo và đối tượng người học khác 
      nhau. Đối với người đã tốt nghiệp trình độ khác hoặc ngành khác, khối lượng 
      học tập thực tế được xác định trên cơ sở công nhận, hoặc chuyển đổi tín chỉ đã 
      tích lũy và miễn trừ học phần trong chương trình đào tạo trước. `,2, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
          5.  Chương trình đào tạo phải được công khai đối với người học trước 
      khi tuyển sinh và khi bắt đầu khóa học; những thay đổi, điều chỉnh liên quan 
      đến chương trình đào tạo được thực hiện theo quy định hiện hành và công bố 
      trước khi áp dụng, không gây tác động bất lợi cho sinh viên.`,2, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
          6.  Đối với mỗi hình thức đào tạo, chương trình đào tạo được cung cấp 
      kế hoạch học tập chuẩn toàn khoá để định hướng cho sinh viên. Thời gian theo 
      kế hoạch học tập chuẩn toàn khoá đối với hình thức đào tạo chính quy phải phù  hợp  với  thời gian quy định trong Khung cơ cấu  hệ  thống giáo  dục  quốc 
      dân, đồng thời đảm bảo đa số sinh viên hoàn thành chương trình đào tạo. `, 2, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
          7.  Thời gian tối đa để sinh viên hoàn thành khoá học 
      Tuỳ theo khả năng học tập, sinh viên được rút ngắn hoặc kéo dài thời 
      gian học như sau:  
      a)  Sinh viên được  phép  rút  ngắn  tối đa một (01) năm học  và  kéo  dài 
      thêm  không vượt quá ba (03) năm học theo kế hoạch học tập. Riêng đối với 
      chương trình liên thông đại học, sinh viên  kéo dài thêm  không vượt quá hai 
      (02) năm học theo kế hoạch học tập. 
      b)  Quá thời hạn tối đa của khóa học, sinh viên sẽ bị xóa tên khỏi danh 
      sách sinh viên của Trường. 
      c)  Tùy vào trường hợp cụ thể, Hiệu trưởng xem xét và gia hạn thêm thời 
      gian đào tạo cho sinh viên nhưng không được vượt quá hai lần thời gian thiết 
      kế của khóa học tương ứng với mỗi chương trình đào tạo.`, 3, true,  [ 'edit', 'delete']),

    createData(Math.floor(10000000 + Math.random() * 90000000),`QUY CHẾ ĐÀO TẠO TRÌNH ĐỘ ĐẠI HỌC 
      TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN, ĐHQG-HCM 
      (Ban hành kèm theo Quyết định số 1175/QĐ-KHTN ngày 24/9/2021 
      của Hiệu trưởng Trường Đại học Khoa học tự nhiên, ĐHQG-HCM)`, 1, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`Chương I 
      NHỮNG QUY ĐỊNH CHUNG`,1 ,true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`Điều 1.  Phạm vi điều chỉnh và đối tượng áp dụng 
      1.  Quy chế này quy định chung về tổ chức và quản lý đào tạo trình độ 
      đại  học theo phương thức đào tạo  tín  chỉ  của  Trường Đại  học  Khoa  học  Tự 
      nhiên, Đại học Quốc Gia Thành Phố Hồ Chí Minh (sau đây gọi tắt là Trường) 
      bao gồm: Chương trình đào tạo và thời gian học tập; hình thức và phương thức 
      tổ chức đào tạo; lập kế hoạch và tổ chức giảng dạy; đánh giá kết quả học tập và 
      cấp bằng tốt nghiệp; những quy định khác đối với sinh viên.  
      2.  Quy chế này áp dụng đối với sinh viên đại học hệ chính quy các khoá 
      đào tạo, các đơn vị, cá nhân thuộc Trường có liên quan trong đào tạo trình độ 
      đại học theo phương thức đào tạo tín chỉ.  
      3.  Quy chế này là căn cứ để Trường xây dựng và ban hành các văn bản 
      quy định cụ thể liên quan đến tổ chức và quản lý đào tạo trình độ đại học hệ 
      chính quy theo phương thức đào tạo tín chỉ.`, 1 , true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
        Điều 2.  Chương trình đào tạo và thời gian học tập 
      1.  Chương trình đào tạo được xây dựng theo đơn vị tín chỉ, cấu trúc từ 
      các môn học hoặc học phần (sau đây gọi chung là học phần), trong đó phải có 
      đủ  các  học  phần  bắt  buộc và đáp ứng  chuẩn chương trình đào tạo  theo  quy 
      định hiện hành của Bộ Giáo dục và Đào tạo. Trong trường hợp đào tạo song 
      ngành hoặc ngành chính - ngành phụ, chương trình đào tạo phải thể hiện rõ 
      khối lượng học tập chung và riêng theo từng ngành. 
      2.  Chương trình đào tạo là những thông tin cơ bản mà sinh viên cần nắm 49  
      vững trong quá trình học tập, bao gồm: trình độ đào tạo, mục tiêu đào tạo, đối 
      tượng đào tạo,  chuẩn đầu  ra  kiến  thức,  kỹ  năng, thái độ,  trách  nhiệm  nghề 
      nghiệp của sinh viên khi tốt nghiệp; khối lượng kiến thức, cấu trúc của chương 
      trình đào tạo; khối lượng kiến thức lý thuyết, thực hành, thực tập của các học 
      phần; kế hoạch đào tạo theo thời gian thiết kế; phương pháp và hình thức đánh 
      giá đối  với  học  phần; điều  kiện  tốt  nghiệp; các điều  kiện  thực  hiện chương 
      trình.`, 1, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
          3.  Chương trình đào tạo bao gồm khối kiến thức giáo dục đại cương và 
      giáo dục chuyên nghiệp. Khối kiến thức giáo dục đại cương nhằm trang bị cho 
      sinh viên nền học vấn rộng; có thế giới quan khoa học và nhân sinh quan đúng 
      đắn; hiểu biết về tự nhiên, xã hội và con người; nắm vững phương pháp tư duy 
      khoa học; có đạo đức, nhận thức trách nhiệm công dân; có năng lực tham gia 
      xây dựng và bảo vệ đất nước, trong đó các học phần bắt buộc phải có theo quy 
      định của Bộ Giáo dục và Đào tạo bao gồm: lý luận chính trị, pháp luật, giáo dục 
      thể  chất,  giáo  dục  quốc  phòng  -  an ninh theo quy định  hiện  hành.  Khối  kiến 
      thức giáo dục chuyên nghiệp được thể hiện theo 2 nhóm gồm nhóm kiến thức 
      cơ sở ngành và nhóm kiến thức chuyên ngành, nhằm cung cấp cho sinh viên 
      những kiến thức và kỹ năng nghề nghiệp ban đầu cần thiết.`, 2, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
          4.  Nội dung, chuẩn đầu ra của chương trình đào tạo áp dụng chung đối 
      với các hình thức, phương thức tổ chức đào tạo và đối tượng người học khác 
      nhau. Đối với người đã tốt nghiệp trình độ khác hoặc ngành khác, khối lượng 
      học tập thực tế được xác định trên cơ sở công nhận, hoặc chuyển đổi tín chỉ đã 
      tích lũy và miễn trừ học phần trong chương trình đào tạo trước. `,2, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
          5.  Chương trình đào tạo phải được công khai đối với người học trước 
      khi tuyển sinh và khi bắt đầu khóa học; những thay đổi, điều chỉnh liên quan 
      đến chương trình đào tạo được thực hiện theo quy định hiện hành và công bố 
      trước khi áp dụng, không gây tác động bất lợi cho sinh viên.`,2, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
          6.  Đối với mỗi hình thức đào tạo, chương trình đào tạo được cung cấp 
      kế hoạch học tập chuẩn toàn khoá để định hướng cho sinh viên. Thời gian theo 
      kế hoạch học tập chuẩn toàn khoá đối với hình thức đào tạo chính quy phải phù  hợp  với  thời gian quy định trong Khung cơ cấu  hệ  thống giáo  dục  quốc 
      dân, đồng thời đảm bảo đa số sinh viên hoàn thành chương trình đào tạo. `, 2, true,  [ 'edit', 'delete']),
    createData(Math.floor(10000000 + Math.random() * 90000000),`
          7.  Thời gian tối đa để sinh viên hoàn thành khoá học 
      Tuỳ theo khả năng học tập, sinh viên được rút ngắn hoặc kéo dài thời 
      gian học như sau:  
      a)  Sinh viên được  phép  rút  ngắn  tối đa một (01) năm học  và  kéo  dài 
      thêm  không vượt quá ba (03) năm học theo kế hoạch học tập. Riêng đối với 
      chương trình liên thông đại học, sinh viên  kéo dài thêm  không vượt quá hai 
      (02) năm học theo kế hoạch học tập. 
      b)  Quá thời hạn tối đa của khóa học, sinh viên sẽ bị xóa tên khỏi danh 
      sách sinh viên của Trường. 
      c)  Tùy vào trường hợp cụ thể, Hiệu trưởng xem xét và gia hạn thêm thời 
      gian đào tạo cho sinh viên nhưng không được vượt quá hai lần thời gian thiết 
      kế của khóa học tương ứng với mỗi chương trình đào tạo.`, 3, true,  [ 'edit', 'delete']),

      createData(Math.floor(10000000 + Math.random() * 90000000),`-kkkkkkk`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`Trang 13`, 13, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`Trang 14`, 14, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`Trang 11`, 11, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`Trang 12`, 12, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`Trang 13`, 13, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 12, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 11, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 2, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 7, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 6, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 6, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 6, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 6, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
      createData(Math.floor(10000000 + Math.random() * 90000000),`---`, 3, true,  [ 'edit', 'delete']),
  ]

  const columns = [
    { 
      field: 'chunk', 
      headerName: 'Đoạn Cắt Từ Tài Liệu', 
      width: 380,
      renderCell: (params) => (
      <Tooltip title= {params.value} placement="top-end" >
        <Typography variant='p' component='p' sx = {{
          textAlign: 'justify',
          padding: '5px 0',
          display: 'block',
          height: '100%',
          maxHeight: '67px',
          width: '100%',
          whiteSpace: 'nowrap',
          textWrap: 'wrap',
          lineHeight: '15px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '4',
          WebkitBoxOrient: 'vertical',
          }}
          onClick={(event) => {
            const page_number = params.row?.page_number
            if (scroll != page_number) {  // Điều kiện cụ thể để ngăn click hàng với id 2
              event.stopPropagation();  // Ngăn sự kiện tiếp tục xử lý
              setScroll(page_number)
    };
          }}>
            {params.value}
          </Typography>
      </Tooltip>
      )
    },
    {
      field: 'enable',
      headerName: 'Hoạt Động',
      width: 80,  
      renderCell: renderControlledSwitches ,  
    },
    {
      field: 'action',
      headerName: '-',
      width: 70,
      renderCell: renderTableAction,
    }
  ];

  const data = {rows, columns}

  return (
    <Block>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit"
        onClick = {handleClick} sx = {{ 
          display: 'flex',
          gap: 1,
          alignItems: 'center'
         }}>
          <TopicOutlinedIcon/> Sổ Tay Sinh Viên
        </Link>,
        <Typography key="2">
          Giới thiệu Khoa.pdf
        </Typography>,
      </Breadcrumbs>

      <Box sx = {{ 
        height: 'calc(100vh - 110px)',
        marginTop: 2,
        borderRadius: '15px',
        display: 'flex',
        gap: 2
       }}>
        <Box sx = {{ 
          width: '60%', 
          minWidth: '450px' ,
        }}>
          <MuiTable 
            useData = {data} 
            rowHeight={101}
          />
        </Box>

        <Box sx = {{ 
            width: '40%',
            height: '100%',
            background: theme => theme.palette.mode == 'dark' ? '#2222228a' : '#fff',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.1)',
            paddingY: 2,
            borderRadius: '15px'
          }}>
          <Documents scroll={scroll}/>
        </Box>
      </Box>
          {/* <Button onClick = {(event) => {handleRowClick(event)}} >HIHIHI</Button> */}
    </Block>
  )
}

export default DatasetDetail
