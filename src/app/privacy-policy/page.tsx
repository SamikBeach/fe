/* eslint-disable react/no-unescaped-entities */
import { VStack, styled } from 'styled-system/jsx';

export default function PrivacyPoLicyPage() {
  return (
    <VStack my="100px">
      <VStack alignItems="start" width="1180px">
        <H1>개인정보 처리방침</H1>

        <Paragraph>
          <strong>삼익비치</strong>(이하 "서비스")는 이용자의
          개인정보 보호를 매우 중요하게 생각하며, '개인정보 보호법' 및 관련
          법령을 준수하고 있습니다. 본 개인정보 처리방침은 이용자의 개인정보가
          어떻게 수집, 이용, 공유되는지에 대한 내용을 설명합니다.
        </Paragraph>

        <H2>1. 개인정보의 수집 항목 및 방법</H2>

        <Paragraph>
          서비스는 회원가입, 원활한 고객 상담, 다양한 서비스 제공을 위해 다음과
          같은 개인정보를 수집합니다.
        </Paragraph>

        <Paragraph>
          <strong>수집 항목:</strong>
        </Paragraph>
        <Ul>
          <Li>필수 정보: 이름, 이메일 주소, 비밀번호, 닉네임</Li>
          <Li>선택 정보: 프로필 사진, 독서 취향 및 관심 분야</Li>
          <Li>자동 수집 정보: 주소, 쿠키, 방문 일시, 서비스 이용 기록</Li>
        </Ul>

        <Paragraph>
          <strong>수집 방법:</strong>
        </Paragraph>
        <Ul>
          <Li>회원가입 시 이용자가 직접 입력하는 정보</Li>
          <Li>서비스 이용 과정에서 자동으로 수집되는 정보</Li>
        </Ul>

        <H2>2. 개인정보의 수집 및 이용 목적</H2>

        <Paragraph>
          서비스는 수집된 개인정보를 다음과 같은 목적을 위해 이용합니다.
        </Paragraph>

        <Ul>
          <Li>회원 관리: 회원 가입 및 본인 확인, 서비스 이용 관리</Li>
          <Li>
            서비스 제공: 맞춤형 도서 추천, 독서 기록 관리, 커뮤니티 활동 지원
          </Li>
          <Li>마케팅 및 광고: 이벤트 정보 제공, 맞춤형 광고 제공</Li>
          <Li>법적 의무 준수: 관련 법령에 따른 의무 이행</Li>
        </Ul>

        <H2>3. 개인정보의 보유 및 이용 기간</H2>

        <Paragraph>
          이용자의 개인정보는 원칙적으로 수집 및 이용 목적이 달성된 후에는 지체
          없이 파기됩니다. 다만, 관련 법령에 따라 일정 기간 보관할 필요가 있는
          경우에는 해당 기간 동안 보관합니다.
        </Paragraph>

        <Ul>
          <Li>회원 탈퇴 시 즉시 삭제</Li>
          <Li>
            법령에 따른 보관 기간: 예) 통신비밀보호법에 따른 로그 기록 3개월
            보관
          </Li>
        </Ul>

        <H2>4. 개인정보의 제3자 제공</H2>

        <Paragraph>
          서비스는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.
          다만, 이용자의 동의가 있거나 법령에 의해 요구되는 경우에는 예외적으로
          제공될 수 있습니다.
        </Paragraph>

        <H2>5. 개인정보 처리 위탁</H2>

        <Paragraph>
          서비스는 원활한 업무 처리를 위해 일부 개인정보 처리 업무를 외부에
          위탁할 수 있습니다. 이 경우, 개인정보가 안전하게 관리될 수 있도록 관련
          법령에 따라 관리 및 감독을 합니다.
        </Paragraph>

        <H2>6. 이용자의 권리</H2>

        <Paragraph>
          이용자는 언제든지 본인의 개인정보 열람, 수정, 삭제, 처리 정지 요청을
          할 수 있습니다. 이를 위해 서비스 내의 '개인정보 관리' 메뉴를
          이용하거나 고객센터로 문의하시면 신속히 처리해 드리겠습니다.
        </Paragraph>

        <H2>7. 개인정보의 보호 대책</H2>

        <Paragraph>
          서비스는 개인정보의 안전한 처리를 위해 다음과 같은 조치를 취하고
          있습니다.
        </Paragraph>

        <Ul>
          <Li>개인정보의 암호화</Li>
          <Li>해킹 및 바이러스 방지 대책</Li>
          <Li>개인정보 접근 제한</Li>
        </Ul>

        <H2>8. 개인정보 처리방침의 변경</H2>

        <Paragraph>
          이 개인정보 처리방침은 법령 및 내부 정책에 따라 변경될 수 있으며, 변경
          사항은 공지사항을 통해 사전 공지됩니다.
        </Paragraph>

        <Paragraph>
          <strong>시행일:</strong> 2024년 11월 1일
        </Paragraph>
      </VStack>
    </VStack>
  );
}

const H1 = styled('h1', {
  base: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
});

const H2 = styled('h2', {
  base: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
});

const Paragraph = styled('p', {
  base: {
    marginLeft: '20px',
  },
});

const Ul = styled('ul', {
  base: {},
});

const Li = styled('li', {
  base: {
    marginLeft: '20px',
  },
});
