import { MdAttachFile } from 'react-icons/md';
import Button from '../../widgets/Button';
import Panel from '../../widgets/panel/Panel';
import PanelHeading from '../../widgets/panel/PanelHeading';
import PanelBody from '../../widgets/panel/PanelBody';
import Divider from '../../widgets/Divider';

const Profile = () => {
  return (
    <Panel className="flex-1 grid grid-cols-1 gap-y-2 p-2">
      <PanelHeading>
        <h3 className="text-lg font-semibold text-[#e88f2f]">마이페이지</h3>
      </PanelHeading>
      <Divider />
      <PanelBody>
        <div className="shadow p-1 sm:shadow-none sm:p-0">
          <dl className="grid grid-cols-1 divide-y divide-gray-100">
            <div className="p-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
              <dt className="font-medium leading-6 text-gray-900">이름</dt>
              <dd className="mt-1 flex  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">홍길동</span>
              </dd>
            </div>
            <div className="p-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
              <dt className="font-medium leading-6 text-gray-900">
                이메일주소
              </dt>
              <dd className="mt-1 flex items-center leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">username@example.com</span>
                <span className="ml-4 flex-shrink-0">
                  <Button type="button" rounded="md" className="text-sm px-2">
                    변경
                  </Button>
                </span>
              </dd>
            </div>
            <div className="p-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
              <dt className="font-medium leading-6 text-gray-900">휴대전화</dt>
              <dd className="mt-1 flex items-center leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">010-1234-1234</span>
                <span className="ml-4 flex-shrink-0">
                  <Button type="button" rounded="md" className="text-sm px-2">
                    변경
                  </Button>
                </span>
              </dd>
            </div>
            <div className="p-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
              <dt className="font-medium leading-6 text-gray-900">첨부파일</dt>
              <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md">
                  <li className="flex items-center justify-between py-1 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <MdAttachFile
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          신분증 사진
                        </span>
                        <span className="flex-shrink-0 text-gray-400">
                          2.4mb
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-shrink-0 space-x-1">
                      <Button
                        type="button"
                        rounded="md"
                        className="text-sm px-2"
                      >
                        변경
                      </Button>
                      <span className="text-gray-200" aria-hidden="true">
                        |
                      </span>
                      <Button
                        type="button"
                        rounded="md"
                        className="text-sm px-2"
                      >
                        삭제
                      </Button>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-1 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <MdAttachFile
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          통장 또는 카드 사진
                        </span>
                        <span className="flex-shrink-0 text-gray-400">
                          4.5mb
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-shrink-0 space-x-1">
                      <Button
                        type="button"
                        rounded="md"
                        className="text-sm px-2"
                      >
                        변경
                      </Button>
                      <span className="text-gray-200" aria-hidden="true">
                        |
                      </span>
                      <Button
                        type="button"
                        rounded="md"
                        className="text-sm px-2"
                      >
                        삭제
                      </Button>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </PanelBody>
    </Panel>
  );
};

export default Profile;
