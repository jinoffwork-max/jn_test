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

const BASE_VIDEO_URL = "https://clovamotion.com:459/26/aitest/";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [videoCount, setVideoCount] = useState(18); // 기본값 18, 자동 감지 후 업데이트
  const videosPerPage = 6;

  // 서버에서 영상 개수 자동 감지
  React.useEffect(() => {
    const detectVideos = async () => {
      let count = 0;
      let checking = true;
      const maxCheck = 100; // 최대 100개까지 체크

      // 순차적으로 파일 존재 여부 확인
      for (let i = 1; i <= maxCheck; i++) {
        try {
          const response = await fetch(`${BASE_VIDEO_URL}video${i}.mp4`, { method: 'HEAD' });
          if (response.ok) {
            count = i;
          } else {
            // 파일이 없으면 중단 (단, 네트워크 지연 고려하여 한 번 더 체크하거나 여기서 멈춤)
            if (i > 1) break; 
          }
        } catch (e) {
          // CORS 등으로 체크 불가 시 기존 로직 유지 위해 중단
          break;
        }
      }
      if (count > 0) setVideoCount(count);
    };

    detectVideos();
  }, []);

  // 영상 데이터 생성 (이름차순 정렬: 큰 번호가 앞으로)
  const sortedVideos = useMemo(() => {
    return Array.from({ length: videoCount }, (_, i) => {
      const videoNum = videoCount - i;
      return {
        id: videoNum,
        title: `Motion Work #${videoNum}`,
        description: `네이버 클라우드 모션 프로젝트 #${videoNum} 상세 영상`,
        videoUrl: `${BASE_VIDEO_URL}video${videoNum}.mp4`,
        date: `2024-03-${String(Math.max(1, 31 - i)).padStart(2, '0')}`,
      };
    });
  }, [videoCount]);

  // 현재 페이지 비디오 추출
  const currentVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * videosPerPage;
    return sortedVideos.slice(startIndex, startIndex + videosPerPage);
  }, [currentPage, sortedVideos]);

  const totalPages = Math.ceil(sortedVideos.length / videosPerPage);

  // 페이지네이션 범위 계산 (최대 3개 번호 노출)
  const getPageNumbers = () => {
    const half = 1;
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + 2);
    
    if (end - start < 2) {
      start = Math.max(1, end - 2);
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-sm bg-black/10">
        <div className="flex items-center gap-2">
          <img src="https://clovamotion.com:459/26/aitest/logo.png" alt="Logo" className="h-8 md:h-10 w-[150px] object-contain" referrerPolicy="no-referrer" />
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
        {/* Bottom Fade Gradient - Increased depth and intensity */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 backdrop-blur-md z-10 pointer-events-none [mask-image:linear-gradient(to_top,black,transparent)]" />
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
            className="text-[30px] font-bold mt-2 tracking-tight leading-[1.1]"
          >
            모션 디자인 포트폴리오
          </motion.h2>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentVideos.map((video, index) => (
              <VideoCard 
                key={video.id}
                title={video.title}
                description={video.description}
                videoUrl={video.videoUrl}
                date={video.date}
                delay={0}
                onClick={() => setSelectedVideo(video)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

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
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  currentPage === pageNum 
                    ? "bg-green-500 text-black font-bold" 
                    : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
                }`}
              >
                {pageNum}
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
              클라우드 경험의 생동감을 설계합니다
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              네이버 클라우드 모션 팀은 단순한 시각 효과를 넘어, 사용자와 서비스가 상호작용하는 모든 순간에 의미 있는 움직임을 부여합니다. 복잡한 클라우드 아키텍처를 직관적으로 이해시키고, 브랜드의 가치를 시각적으로 전달합니다.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-300 font-medium">UI/UX 인터랙션 디자인</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <span className="text-gray-300 font-medium">브랜드 필름 및 프로모션 모션</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                </div>
                <span className="text-gray-300 font-medium">3D 인프라 시각화</span>
              </li>
            </ul>
            <button className="group flex items-center gap-2 text-white font-semibold hover:text-green-400 transition-colors">
              팀 소개 더보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-2xl border border-white/5 overflow-hidden group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-green-500/20 blur-[100px] group-hover:bg-green-500/40 transition-colors" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <Glass3DIcon />
              <h3 className="text-2xl font-bold mb-4">비주얼 스토리텔링</h3>
              <p className="text-gray-500">기술의 복잡함을 걷어내고, 움직임을 통해 서비스의 핵심 가치를 명확하게 전달합니다.</p>
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

const Glass3DIcon = () => {
  return (
    <motion.div
      animate={{ 
        rotateY: [15, -15, 15],
        rotateX: [10, -10, 10],
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      className="relative w-24 h-24 mb-8 flex items-center justify-center"
    >
      {/* 3D Depth Layers (Simulating thickness) */}
      {[...Array(5)].map((_, i) => (
        <Zap 
          key={i}
          className="absolute w-20 h-20 text-white/5"
          style={{ 
            transform: `translateZ(${-i * 4}px)`,
            filter: `blur(${i * 0.5}px)`,
            strokeWidth: 1.5
          }}
        />
      ))}

      {/* Main Glass Body */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        <Zap 
          className="w-full h-full text-white/20 fill-white/10 backdrop-blur-md"
          style={{ 
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))",
            strokeWidth: 2
          }}
        />
        
        {/* Shiny Edge Highlight */}
        <Zap 
          className="absolute inset-0 w-full h-full text-white/40 fill-transparent"
          style={{ 
            strokeWidth: 1,
            filter: "blur(0.5px)"
          }}
        />

        {/* Animated Glint */}
        <div className="absolute inset-0 overflow-hidden [mask-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlnb24gcG9pbnRzPSIxMyAyIDMgMTQgMTIgMTQgMTEgMjIgMjEgMTAgMTIgMTAgMTMgMiIvPjwvc3ZnPg==')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]">
          <motion.div 
            animate={{ 
              left: ["-100%", "200%"] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              repeatDelay: 1.5,
              ease: "linear" 
            }}
            className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12"
          />
        </div>
      </div>

      {/* Internal Glow */}
      <Zap 
        className="absolute w-16 h-16 text-green-500/30 blur-xl animate-pulse"
      />
      
      {/* Bottom Reflection */}
      <div className="absolute -bottom-6 w-16 h-3 bg-green-500/20 blur-xl rounded-full" />
    </motion.div>
  );
};

interface VideoCardProps {
  title: string;
  description: string;
  videoUrl: string;
  date: string;
  delay: number;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, description, videoUrl, date, onClick }) => {
  return (
    <div 
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
    </div>
  );
};
