import React, { ReactNode, useState, useMemo } from "react";
import { TubesCursor } from "@/src/components/ui/tube-cursor";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Globe,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// 포트폴리오 영상 데이터 설정 (날짜 추가 및 18개로 확장)
const PORTFOLIO_VIDEOS = [
  {
    id: 1,
    title: "Naver Cloud Platform Intro",
    description: "네이버 클라우드 플랫폼 브랜드 인트로 영상",
    videoUrl: "https://clovamotion.com:459/26/aitest/video1.mp4",
    date: "2024-03-20",
  },
  {
    id: 2,
    title: "Service Architecture Visual",
    description: "복잡한 클라우드 아키텍처의 시각화 모션",
    videoUrl: "https://clovamotion.com:459/26/aitest/video2.mp4",
    date: "2024-03-15",
  },
  {
    id: 3,
    title: "User Interface Motion",
    description: "차세대 클라우드 콘솔 UI 인터랙션 디자인",
    videoUrl: "https://clovamotion.com:459/26/aitest/video3.mp4",
    date: "2024-03-10",
  },
  {
    id: 4,
    title: "Data Center 3D Motion",
    description: "데이터 센터 인프라 3D 모션 그래픽",
    videoUrl: "https://clovamotion.com:459/26/aitest/video4.mp4",
    date: "2024-03-05",
  },
  {
    id: 5,
    title: "Security Solution Promo",
    description: "클라우드 보안 솔루션 프로모션 영상",
    videoUrl: "https://clovamotion.com:459/26/aitest/video5.mp4",
    date: "2024-02-28",
  },
  {
    id: 6,
    title: "AI Service Brand Film",
    description: "네이버 클라우드 AI 서비스 브랜드 필름",
    videoUrl: "https://clovamotion.com:459/26/aitest/video6.mp4",
    date: "2024-02-20",
  },
  {
    id: 7,
    title: "Cloud Connect 2024",
    description: "클라우드 커넥트 컨퍼런스 오프닝 모션",
    videoUrl: "https://clovamotion.com:459/26/aitest/video1.mp4",
    date: "2024-02-15",
  },
  {
    id: 8,
    title: "Global Region Expansion",
    description: "글로벌 리전 확장 기념 인포그래픽 모션",
    videoUrl: "https://clovamotion.com:459/26/aitest/video2.mp4",
    date: "2024-02-10",
  },
  {
    id: 9,
    title: "Developer Console Redesign",
    description: "개발자 콘솔 리디자인 인터랙션 가이드",
    videoUrl: "https://clovamotion.com:459/26/aitest/video3.mp4",
    date: "2024-02-05",
  },
  {
    id: 10,
    title: "Storage Service Explainer",
    description: "클라우드 스토리지 서비스 기능 설명 영상",
    videoUrl: "https://clovamotion.com:459/26/aitest/video4.mp4",
    date: "2024-01-30",
  },
  {
    id: 11,
    title: "Networking Solution Visual",
    description: "고성능 네트워크 솔루션 시각화",
    videoUrl: "https://clovamotion.com:459/26/aitest/video5.mp4",
    date: "2024-01-25",
  },
  {
    id: 12,
    title: "Hybrid Cloud Strategy",
    description: "하이브리드 클라우드 전략 홍보 영상",
    videoUrl: "https://clovamotion.com:459/26/aitest/video6.mp4",
    date: "2024-01-20",
  },
  {
    id: 13,
    title: "Naver Works Integration",
    description: "네이버웍스 연동 서비스 모션 가이드",
    videoUrl: "https://clovamotion.com:459/26/aitest/video1.mp4",
    date: "2024-01-15",
  },
  {
    id: 14,
    title: "Cloud DB for MySQL",
    description: "클라우드 DB 서비스 인트로 모션",
    videoUrl: "https://clovamotion.com:459/26/aitest/video2.mp4",
    date: "2024-01-10",
  },
  {
    id: 15,
    title: "Security Monitoring UI",
    description: "보안 모니터링 대시보드 인터랙션",
    videoUrl: "https://clovamotion.com:459/26/aitest/video3.mp4",
    date: "2024-01-05",
  },
  {
    id: 16,
    title: "Auto Scaling Demo",
    description: "오토 스케일링 기능 시각화 데모",
    videoUrl: "https://clovamotion.com:459/26/aitest/video4.mp4",
    date: "2023-12-28",
  },
  {
    id: 17,
    title: "Serverless Computing",
    description: "서버리스 컴퓨팅 개념 설명 모션",
    videoUrl: "https://clovamotion.com:459/26/aitest/video5.mp4",
    date: "2023-12-20",
  },
  {
    id: 18,
    title: "Naver Cloud Vision 2024",
    description: "네이버 클라우드 2024 비전 선포 영상",
    videoUrl: "https://clovamotion.com:459/26/aitest/video6.mp4",
    date: "2023-12-15",
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<typeof PORTFOLIO_VIDEOS[0] | null>(null);
  const videosPerPage = 6;

  // 최신 날짜순 정렬
  const sortedVideos = useMemo(() => {
    return [...PORTFOLIO_VIDEOS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  // 현재 페이지 비디오 추출
  const currentVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * videosPerPage;
    return sortedVideos.slice(startIndex, startIndex + videosPerPage);
  }, [currentPage, sortedVideos]);

  const totalPages = Math.ceil(sortedVideos.length / videosPerPage);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-sm bg-black/10">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 md:h-10 w-[150px] object-contain" referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#portfolio" className="hover:text-white transition-colors">포트폴리오</a>
          <a href="#about" className="hover:text-white transition-colors">소개</a>
          <button className="px-5 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
            연락하기
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <TubesCursor
          title="NaverCloud Motion Team"
          subtitle="We design motion for real interfaces."
          caption="UI Motion · Interaction · Visual Experience"
          initialColors={["#00ff00", "#00c73c", "#ffffff"]}
          lightColors={["#00ff00", "#ffffff", "#00c73c", "#000000"]}
          lightIntensity={300}
          titleSize="text-4xl md:text-5xl lg:text-6xl"
          subtitleSize="text-xl md:text-2xl lg:text-3xl"
          captionSize="text-sm md:text-base lg:text-lg"
          enableRandomizeOnClick
        />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-green-500 font-semibold tracking-widest uppercase text-sm"
          >
            Selected Works
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-4 tracking-tight"
          >
            모션 디자인 포트폴리오
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentVideos.map((video, index) => (
            <VideoCard 
              key={video.id}
              title={video.title}
              description={video.description}
              videoUrl={video.videoUrl}
              date={video.date}
              delay={0.1 * (index + 1)}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center items-center gap-4">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-zinc-800 disabled:opacity-30 hover:bg-zinc-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  currentPage === i + 1 
                    ? "bg-green-500 text-black font-bold" 
                    : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-zinc-800 disabled:opacity-30 hover:bg-zinc-900 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedVideo(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <video 
                src={selectedVideo.videoUrl}
                className="w-full h-full"
                controls
                autoPlay
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Showcase / About */}
      <section id="about" className="py-24 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              현대적 웹을 위한 설계
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Tubes.io는 표준 웹 애플리케이션에 고품질 3D 미학을 제공하기 위해 설계된 프레임워크 독립적 비주얼 엔진입니다. 창의적인 포트폴리오부터 하이테크 대시보드까지, 우리의 컴포넌트는 완벽하게 통합됩니다.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                </div>
                <span className="text-gray-300 font-medium">가벼운 런타임 (20kb 미만)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <span className="text-gray-300 font-medium">완벽한 TypeScript 지원</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-pink-500" />
                </div>
                <span className="text-gray-300 font-medium">React, Vue, Svelte 호환</span>
              </li>
            </ul>
            <button className="group flex items-center gap-2 text-white font-semibold hover:text-purple-400 transition-colors">
              문서 읽어보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-white/5 overflow-hidden group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-purple-500/20 blur-[100px] group-hover:bg-purple-500/40 transition-colors" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <Globe className="w-16 h-16 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">글로벌 인프라</h3>
              <p className="text-gray-500">클릭 한 번으로 인터랙티브 경험을 글로벌 엣지 네트워크에 배포하세요.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-[55px] font-bold tracking-tighter mb-8 font-[Arial]">
            서비스의 움직임을 설계합니다
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all hover:scale-105">
              시작하기
            </button>
            <button className="w-full md:w-auto px-8 py-4 bg-zinc-900 text-white border border-zinc-800 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all">
              문의하기
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-6 md:h-8 w-[120px] object-contain" referrerPolicy="no-referrer" />
          </div>
          
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">문서</a>
            <a href="#" className="hover:text-white transition-colors">상태</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="mt-12 text-center text-zinc-700 text-xs">
          © 2026 Motion Design Portfolio @NAVERCLOUD. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

interface VideoCardProps {
  title: string;
  description: string;
  videoUrl: string;
  date: string;
  delay: number;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, description, videoUrl, date, delay, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onClick={onClick}
      className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-green-500/50 transition-all duration-500 cursor-pointer"
    >
      <div className="aspect-video w-full overflow-hidden bg-black relative">
        <video 
          src={videoUrl} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          muted
          loop
          onLoadedMetadata={(e) => {
            const video = e.target as HTMLVideoElement;
            video.currentTime = video.duration * 0.4;
          }}
          onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
          onMouseOut={(e) => {
            const video = e.target as HTMLVideoElement;
            video.pause();
            video.currentTime = video.duration * 0.4;
          }}
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold group-hover:text-green-400 transition-colors">{title}</h3>
          <span className="text-[10px] text-zinc-600 font-mono mt-1">{date}</span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
