import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
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
