export const Intro = () => {
  return (
    <section className="w-full">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="block h-auto w-full"
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>
    </section>
  );
};
