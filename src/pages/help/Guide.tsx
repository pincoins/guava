import Panel from '../../widgets/panel/Panel';
import PanelBody from '../../widgets/panel/PanelBody';
import PanelHeading from '../../widgets/panel/PanelHeading';
import Divider from '../../widgets/dividers/Divider';

const Guide = () => {
  return (
    <div className="flex-1 grid grid-cols-1 p-2 sm:p-0 sm:justify-center gap-x-4 gap-y-4">
      <Panel className="grid grid-cols-1 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#1d915c]">
            회원가입 및 탈퇴
          </h3>
        </PanelHeading>
        <Divider />
        <PanelBody className="text-sm leading-7">
          <ul className="marker:text-[#03353e] list-disc list-inside space-y-1">
            <li>
              핀코인(pincoin)은 회원제로 운영하며 반드시 회원가입해야 상품권을
              주문할 수 있습니다.
            </li>
            <li>
              회원은 언제든지 회원탈퇴할 수 있으며 수집된 회원개인정보는 즉시
              파기합니다.
            </li>
            <li>
              단, 전자상거래 등에서의 소비자보호에 관한 법률 제6조에 의거
              아이디, 이름, 전자우편주소 등 거래의 주체를 식별할 수 있는 정보에
              한하여 서비스 이용에 관한 동의를 철회한 경우에도 이를 보존할 수
              있으며, 동법 시행령 제6조에 의거 다음과 같이 거래 기록을
              보관합니다.
              <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-4">
                <li>표시, 광고에 관한 기록 : 6개월</li>
                <li>계약 또는 청약철회 등에 관한 기록 : 5년</li>
                <li>대금결제 및 재화 등의 공급에 관한 기록 : 5년</li>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</li>
                <li>채권․채무관계 잔존시에는 해당 채권․채무관계 정산시까지</li>
              </ul>
            </li>
          </ul>
        </PanelBody>
      </Panel>
      <Panel className="grid grid-cols-1 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#1d915c]">본인 인증</h3>
        </PanelHeading>
        <Divider />
        <PanelBody className="text-sm leading-7">
          <ul className="marker:text-[#03353e] list-disc list-inside space-y-1">
            <li>
              핀코인은 보이스피싱 및 파밍 사기 피해 방지를 위하여&nbsp;
              <span className="font-bold">휴대폰본인인증(필수)</span>을 요청하고
              있습니다.
              <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-4">
                <li>
                  해외에서 페이팔 결제하시는 경우 서류본인인증을 대신 완료해야
                  합니다.
                </li>
              </ul>
            </li>
            <li>
              핀코인은 보이스피싱 및 파밍 사기 피해 방지를 위하여 경우에
              따라&nbsp;
              <span className="font-bold">서류본인인증(선택)</span>을 요청하고
              있습니다.
              <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-4">
                <li>
                  컬쳐랜드상품권, 해피머니, 도서문화상품권, 구글기프트카드를
                  포함하고 일일 액면가 기준 누계 20만원 이상 첫 구매 시 반드시
                  서류본인인증을 해야 합니다.
                </li>
                <li>
                  계좌이체로 일일 액면가 기준 누계 30만원 이상 첫 구매 시 반드시
                  서류본인인증을 해야 합니다.
                </li>
                <li>
                  페이팔로 최근30일 이내 액면가 기준 누계 15만원 이상 구매 시
                  반드시 한국 신분증으로 서류본인인증을 해야 합니다.
                </li>
              </ul>
            </li>
            <li>
              서류본인인증을 위해 확인되야 하는 정보는 다음과 같습니다.
              <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-4">
                <li>
                  신분증 (주민등록증, 운전면허증) - 여권 및 등초본 불가
                  <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-8">
                    <li>
                      주민등록번호 뒷자리 및 사진 가리고 이름, 생년월일, 주소
                      전체가 보여야 합니다.
                    </li>
                    <li>
                      포스트잇 등 메모지에 업로드 일자 및 "핀코인 상품권 구매"
                      반드시 직접 손으로 적은 후 신분증과 같이 사진 찍어 올려야
                      합니다.
                    </li>
                  </ul>
                </li>
                <li>통장 또는 ATM 카드, 체크카드</li>
                <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-8">
                  <li>
                    통장번호 또는 카드번호를 가리고 이름, 은행 이름 또는 카드
                    회사가 보여야 합니다.
                  </li>
                  <li>
                    포스트잇 등 메모지에 업로드 일자 및 "핀코인 상품권 구매"
                    반드시 직접 손으로 적은 후 통장 또는 카드 사진과 같이 찍어
                    올려야 합니다.
                  </li>
                </ul>
              </ul>
            </li>
            <li>
              저희 핀코인은 고객 여러분의 안전한 상품권 구매와 개인정보 보호
              관리를 위해 노력합니다.
              <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-4">
                <li>
                  고객 여러분께서 제출한 개인정보 사진은 어디에도 노출되지
                  않으며 암호화하여 파일을 저장합니다.
                </li>
                <li>
                  제출한 사진은 개인정보보호 및 시스템 보안을 위해
                  마이페이지에서도 열람할 수 없습니다.
                </li>
                <li>
                  제출한 사진은 경찰 등 수사기관의 요청이 없는 경우 3개월 이후
                  지체 없이 파기합니다.
                </li>
              </ul>
            </li>
          </ul>
        </PanelBody>
      </Panel>
      <Panel className="grid grid-cols-1 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#1d915c]">주문 방법</h3>
        </PanelHeading>
        <Divider />
        <PanelBody className="text-sm leading-7">
          <ul className="marker:text-[#03353e] list-disc list-inside space-y-1">
            <li>
              핀코인은 반드시 회원가입 후 로그인해야 상품권을 주문할 수
              있습니다.
            </li>
            <li>
              원하시는 상품권을 장바구니에 담고 장바구니 페이지에서 수량을
              변경하실 수 있습니다.
            </li>
            <li>
              아래에서 설명하는 결제 방법을 선택하고 약관 동의 후 주문을
              완료합니다.
            </li>
          </ul>
        </PanelBody>
      </Panel>
      <Panel className="grid grid-cols-1 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#1d915c]">결제 방법</h3>
        </PanelHeading>
        <Divider />
        <PanelBody className="text-sm leading-7">
          <ul className="marker:text-[#03353e] list-disc list-inside space-y-1">
            <li>
              핀코인에서 주문을 완료하시면 다음 방법으로 결제 가능합니다.
              <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-4">
                <li>계좌이체 / 무통장입금</li>
                <li>국민은행</li>
                <li>에스크로</li>
                <li>페이팔</li>
              </ul>
            </li>
            <li>
              핀코인에서 주문을 완료하시면 다음 은행으로 계좌이체 또는 무통장
              입금 가능합니다.
              <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-4">
                <li>국민은행</li>
                <li>신한은행</li>
                <li>기업은행</li>
                <li>농협</li>
              </ul>
            </li>
            <li>
              계좌이체 또는 무통장 입금할 경우 주문자와 입금자의 실명이 반드시
              일치해야 합니다.
            </li>
            <li>
              에스크로 결제는 국민은행 에스크로에 거래 대금을 예치하시면 됩니다.
            </li>
            <li>페이팔 결제는 USD로 결제됩니다.</li>
            <li>
              페이팔 결제 시 아래의 경우에는 무효 처리하고 12시간 이내 무조건
              환불 처리됩니다.
              <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-4">
                <li>
                  핀코인 계정 기본 이메일 주소와 페이팔 계정 이메일 주소 불일치
                  <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-8">
                    <li>
                      핀코인 계정의 기본 이메일 주소와 페이팔 계정의 이메일
                      주소가 동일해야 합니다. 기본 이메일 주소 등록을 위해서는
                      이메일 주소 인증을 먼저 해야 합니다.
                    </li>
                  </ul>
                </li>
                <li>
                  unverified 또는 unregistered 페이팔 계정
                  <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-8">
                    <li>
                      verified (확인된) 페이팔 계정으로만 결제 가능합니다.
                    </li>
                  </ul>
                </li>
                <li>
                  echeck 결제
                  <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-8">
                    <li>instant (즉시) 결제로만 결제 가능합니다.</li>
                  </ul>
                </li>
                <li>
                  서류본인인증 미완료
                  <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-8">
                    <li>
                      페이팔로 최근 30일 이내 액면가 기준 누계 15만원 이상 구매
                      시 반드시 한국 내 주소 확인 가능한 신분증으로
                      서류본인인증을 완료해야 합니다.
                    </li>
                  </ul>
                </li>
                <li>
                  페이팔 최소 결제 금액 9천원 미만
                  <ul className="marker:text-[#03353e] list-disc list-inside space-y-1 pl-8">
                    <li>
                      페이팔 수수료 문제로 인하여 원화 기준 최소 9천원 이상일 때
                      결제 가능합니다.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </PanelBody>
      </Panel>
      <Panel className="grid grid-cols-1 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#1d915c]">
            상품권 발송 및 확인
          </h3>
        </PanelHeading>
        <Divider />
        <PanelBody className="text-sm leading-7">
          <ul className="marker:text-[#03353e] list-disc list-inside space-y-1">
            <li>
              핀코인에서 판매되는 상품권은 온라인 상품권으로 실물이 아닌
              핀번호만 발송됩니다.
            </li>
            <li>상품권 확인은 핀코인 사이트 주문내역에서 확인합니다.</li>
            <li>
              한국 시각 밤 11시 이후 20만원 이상 최초 고액 주문은 확인을 위해
              한국 시각 오전 10시 이후에 순차적으로 발송될 수 있습니다.
            </li>
            <li>
              메뉴의 마이페이지에서 모든 본인인증 절차를 완료하신 경우 최대 10분
              이내로 상품권을 확인할 수 있습니다.
            </li>
            <li>
              모든 본인인증 절차를 완료하시고도 10분 이내로 상품권을 확인하지
              못한 경우 고객문의에 주문번호, 입금은행, 입금시각을 남겨주세요.
            </li>
          </ul>
        </PanelBody>
      </Panel>
      <Panel className="grid grid-cols-1 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#1d915c]">주문 취소</h3>
        </PanelHeading>
        <Divider />
        <PanelBody className="text-sm leading-7">
          <ul className="marker:text-[#03353e] list-disc list-inside space-y-1">
            <li>
              무통장 입금의 경우 주문 완료 후 다음 날 입금하지 않으면 자동으로
              주문취소 됩니다.
            </li>
            <li>
              입금 이전에는 구매자가 직접 주문내역 페이지에서 주문을 취소할 수도
              있습니다.
            </li>
          </ul>
        </PanelBody>
      </Panel>
      <Panel className="grid grid-cols-1 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#1d915c]">교환 및 환불</h3>
        </PanelHeading>
        <Divider />
        <PanelBody className="text-sm leading-7">
          <ul className="marker:text-[#03353e] list-disc list-inside space-y-1">
            <li>핀코인은 소비자보호를 위해서 규정한 제반 법규를 준수합니다.</li>
            <li>
              상품권을 받기 전에 고객님의 교환 또는 환불 요청이 있은 날로부터
              은행 영업일 기준으로 3~5일 이내에 처리됩니다.
            </li>
            <li>
              상품권을 받으신 경우 해당 상품권을 사용하지 않은 경우에 한하여 3일
              이내에만 교환 또는 환불 요청 가능합니다.
            </li>
            <li>
              교환 또는 환불 요청한 날로부터 은행 영업일 기준 5~7일 이내에 환불
              수수료 500원 차감한 금액이 환불 입금처리됩니다.
            </li>
          </ul>
        </PanelBody>
      </Panel>
      <Panel className="grid grid-cols-1 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#1d915c]">
            상품권 구매한도
          </h3>
        </PanelHeading>
        <Divider />
        <PanelBody className="text-sm leading-7">
          <ul className="marker:text-[#03353e] list-disc list-inside space-y-1">
            <li>
              문화상품권, 해피머니, 도서문화상품권, 구글기프트카드를 포함하고
              일일 액면가 기준 누계 20만원 이상 첫 구매 시 반드시 서류본인인증을
              해야 합니다.
            </li>
            <li>
              계좌이체로 일일 액면가 기준 누계 30만원 이상 첫 구매 시 반드시
              서류본인인증을 해야 합니다.
            </li>
            <li>
              페이팔로 최근30일 이내 액면가 기준 누계 15만원 이상 구매 시 반드시
              한국 신분증으로 서류본인인증을 해야 합니다.
            </li>
          </ul>
        </PanelBody>
      </Panel>
      <Panel className="grid grid-cols-1 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#1d915c]">
            적립금 제도 미운영
          </h3>
        </PanelHeading>
        <Divider />
        <PanelBody className="text-sm leading-7">
          <ul className="marker:text-[#03353e] list-disc list-inside space-y-1">
            <li>핀코인은 적립금 제도를 운영하지 않습니다.</li>
            <li>
              과거 100원 이익이 발생하면 50원 적립금을 드렸으나 현재는 차라리
              무조건 50원 이익으로 판매하고 있습니다.
            </li>
            <li>
              핀코인은 이제 50원 이익이 아니라 30원, 20원 이익을 낮춰 고객
              여러분께 최저가로 상품권을 판매하기 위해 최선을 다하고 있습니다.
            </li>
          </ul>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default Guide;
