//@ts-check
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default withPWA({
  eslint:{
      ignoreDuringBuilds: true,
    },
    typescript:{
      ignoreBuildErrors:true
    },
    images:{domains:['utfs.io']},
    experimental:{
      serverComponentsExternalPackages:['@node-rs/argon2']
    }
});
