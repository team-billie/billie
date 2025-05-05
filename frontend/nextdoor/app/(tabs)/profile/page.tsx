import LinkHeader from "@/components/(tabs)/profile/LinkHeader";
import PayBox from "@/components/(tabs)/profile/PayBox";

export default function ProfilePage() {
    return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="flex-1 flex flex-col bg-blue300 p-4">
        <div className="flex-1 flex flex-col pt-8 text-white font-bold text-2xl px-2">
          <span>안녕하세요</span>
          <span>username 님!</span>
        </div>
        
        <PayBox type="profile"/>
      </div>
      
      <div className="flex flex-col gap-4 bg-gray100 text-gray-700 p-4">
        <div className="bg-white shadow-popup p-4 rounded-2xl">
          <LinkHeader type="like"/>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-popup p-4 rounded-2xl">
            <LinkHeader type="reservation"/>
            <div className="flex justify-end items-end font-bold px-2 mt-1 text-gray900">
              <span className="text-4xl">4</span>
              <span className="text-lg">건</span>
            </div>
            <div className="mt-3 text-center text-gray500 text-sm">현재 에약중인 물품수</div>
          </div>

          <div className="bg-white shadow-popup p-4 rounded-2xl">
            <LinkHeader type="apply"/>
            <div className="flex justify-end items-end font-bold px-2 mt-1 text-gray900">
              <span className="text-4xl">4</span>
              <span className="text-lg">건</span>
            </div>
            <div className="mt-3 text-center text-gray500 text-sm">예약 요청중인 물품수</div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="text-center text-white text-lg bg-gray900 shadow-popup py-2 px-14 rounded-2xl">logout</div>
        </div>
      </div>
    </div>
    );
  }