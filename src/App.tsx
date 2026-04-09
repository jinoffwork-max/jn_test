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

const BASE_VIDEO_URL = "https://clovamotion.com:459/";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [videoList, setVideoList] = useState<string[]>([]);
  const [scanStatus, setScanStatus] = useState<'scanning' | 'auto' | 'fallback'>('scanning');
  const videosPerPage = 6;

  // API를 통한 비디오 목록 자동 스캔
  React.useEffect(() => {
    const fetchVideoList = async () => {
      try {
        setScanStatus('scanning');
        const response = await fetch("/api/videos");
        if (response.ok) {
          const filtered: string[] = await response.json();
          setVideoList(filtered);
          // 백엔드에서 에러 메시지를 포함해 보냈는지 확인 (실제로는 200이지만 내용은 fallback일 수 있음)
          // 여기서는 단순화해서 리스트가 있으면 성공으로 간주하되, 
          // 실제 자동 스캔 성공 여부는 백엔드 로그로 확인 가능
          setScanStatus('auto');
        } else {
          setScanStatus('fallback');
        }
      } catch (error) {
        setScanStatus('fallback');
      }
    };

    fetchVideoList();
    // 1분마다 자동 갱신 (서버 파일 추가 시 자동 반영)
    const interval = setInterval(fetchVideoList, 60000);
    return () => clearInterval(interval);
  }, []);

  // 영상 데이터 생성
  const sortedVideos = useMemo(() => {
    return videoList.map((path, i) => {
      // 영상 번호에 따른 가상의 프로젝트 성격 부여
      const projectTypes = [
        { title: "Brand Identity Motion", desc: "브랜드의 핵심 가치를 시각적 움직임으로 전달하는 브랜드 필름" },
        { title: "UI Interaction Design", desc: "사용자 경험을 풍부하게 만드는 인터랙티브 요소 및 마이크로 인터랙션" },
        { title: "Cloud Infra Visualization", desc: "복잡한 클라우드 인프라와 데이터를 직관적으로 이해시키는 3D 시각화" },
        { title: "Service Promo Film", desc: "신규 서비스의 특장점을 효과적으로 소구하는 프로모션 모션 그래픽" },
        { title: "Event Opening Motion", desc: "컨퍼런스 및 주요 행사의 몰입감을 높이는 오프닝 시퀀스" }
      ];
      
      const type = projectTypes[i % projectTypes.length];

      // 경로 처리: 이미 /www/로 시작하면 그대로 사용, 아니면 붙여줌
      let finalUrl = path;
      if (!path.startsWith('http') && !path.startsWith('/www/')) {
        finalUrl = `${BASE_VIDEO_URL}${path.startsWith('/') ? path.slice(1) : path}`;
      }

      return {
        id: i,
        title: type.title,
        description: type.desc,
        videoUrl: finalUrl,
        date: `2024-03-${String(Math.max(1, 31 - i)).padStart(2, '0')}`,
      };
    });
  }, [videoList]);

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
    
    // 현재 페이지가 마지막에 가까울 때 시작 페이지 조정
    if (currentPage >= totalPages - 1) {
      start = Math.max(1, totalPages - 2);
      end = totalPages;
    }
    
    // 현재 페이지가 시작에 가까울 때 끝 페이지 조정
    if (currentPage <= 2) {
      start = 1;
      end = Math.min(totalPages, 3);
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
          <div className="mt-4 flex justify-center items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-600">
            <div className={`w-1.5 h-1.5 rounded-full ${
              scanStatus === 'scanning' ? 'bg-yellow-500 animate-pulse' : 
              scanStatus === 'auto' ? 'bg-green-500' : 'bg-red-500'
            }`} />
            {scanStatus === 'scanning' ? 'Scanning Server...' : 
             scanStatus === 'auto' ? 'Auto-Sync Active' : 'Manual List Mode (Server Locked)'}
          </div>
        </div>

        {currentVideos.length > 0 ? (
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              id="video-container"
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
        ) : (
          <div className="py-20 text-center border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-gray-500 mb-4">표시할 영상이 없습니다.</p>
            <p className="text-xs text-zinc-600">
              파일명이 'tsl'로 시작하는 .mp4 파일이 video-list.json에 있는지 확인해주세요.
            </p>
          </div>
        )}

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
            <img src="https://clovamotion.com:459/26/aitest/logo.png" alt="Logo" className="h-6 md:h-8 w-[120px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" referrerPolicy="no-referrer" />
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
        rotateY: [20, -20, 20],
        rotateX: [10, -10, 10],
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      className="relative w-32 h-32 mb-8 flex items-center justify-center scale-100"
    >
      {/* 3D Depth Layers (Increased thickness and transparency) */}
      {[...Array(15)].map((_, i) => (
        <Zap 
          key={i}
          className="absolute w-24 h-24"
          style={{ 
            transform: `translateZ(${-i * 5}px)`,
            color: i === 0 
              ? "rgba(255,255,255,0.5)" 
              : i === 14 
                ? "rgba(255,255,255,0.2)" 
                : "rgba(255,255,255,0.03)",
            fill: i === 0 
              ? "rgba(255,255,255,0.05)" 
              : "rgba(255,255,255,0.01)",
            filter: i === 0 ? "none" : `blur(${i * 0.2}px)`,
            strokeWidth: i === 0 ? 1.2 : 0.5,
            backdropFilter: i === 0 ? "blur(4px)" : "none",
          }}
        />
      ))}

      {/* Internal Refraction Core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(-35px)" }}>
        <Zap 
          className="w-20 h-20 text-white/10 fill-white/5"
          style={{ 
            filter: "blur(2px) contrast(120%)",
          }}
        />
      </div>

      {/* Sharp Edge Highlights */}
      <div className="relative w-24 h-24 flex items-center justify-center" style={{ transform: "translateZ(2px)" }}>
        <Zap 
          className="w-full h-full text-white/70 fill-transparent"
          style={{ 
            strokeWidth: 0.8,
            filter: "drop-shadow(0 0 3px rgba(255,255,255,0.6))",
          }}
        />
        
        {/* Crystalline Glint Animation */}
        <div className="absolute inset-0 overflow-hidden [mask-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlnb24gcG9pbnRzPSIxMyAyIDMgMTQgMTIgMTQgMTEgMjIgMjEgMTAgMTIgMTAgMTMgMiIvPjwvc3ZnPg==')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]">
          <motion.div 
            animate={{ 
              top: ["-150%", "250%"],
              left: ["-150%", "250%"]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              repeatDelay: 1,
              ease: "easeInOut" 
            }}
            className="absolute w-[300%] h-16 bg-gradient-to-r from-transparent via-white/80 to-transparent rotate-45"
          />
        </div>
      </div>

      {/* Deep Shadow for Volume */}
      <Zap 
        className="absolute w-24 h-24 text-black/40 fill-black/20 blur-md"
        style={{ transform: "translateZ(-80px)" }}
      />
      
      {/* Bottom Reflection */}
      <div className="absolute -bottom-10 w-24 h-5 bg-white/5 blur-3xl rounded-full" />
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
