//@ts-check
/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // disable: process.env.NODE_ENV === "development",
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
    experimental:{
      serverComponentsExternalPackages:['@node-rs/argon2']
    }
});
