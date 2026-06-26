// vite.config.ts
import path from "path";
import { defineConfig, loadEnv } from "file:///C:/Project/checkrace/react%20v.2/web-checkrace-2024/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Project/checkrace/react%20v.2/web-checkrace-2024/node_modules/@vitejs/plugin-react-swc/index.mjs";
import checker from "file:///C:/Project/checkrace/react%20v.2/web-checkrace-2024/node_modules/vite-plugin-checker/dist/esm/main.js";
import { ViteImageOptimizer } from "file:///C:/Project/checkrace/react%20v.2/web-checkrace-2024/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Project\\checkrace\\react v.2\\web-checkrace-2024";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"'
        },
        overlay: {
          initialIsOpen: false
        }
      }),
      ViteImageOptimizer({
        png: {
          quality: 40
        },
        jpeg: {
          quality: 40
        },
        jpg: {
          quality: 40
        },
        svg: {
          multipass: true,
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  cleanupNumericValues: false,
                  removeViewBox: false
                }
              }
            },
            "sortAttrs",
            {
              name: "addAttributesToSVGElement",
              params: {
                attributes: [{ xmlns: "http://www.w3.org/2000/svg" }]
              }
            }
          ]
        }
      })
    ],
    optimizeDeps: {
      include: ["@emotion/styled"]
    },
    resolve: {
      alias: [
        {
          find: /^~(.+)/,
          replacement: path.join(process.cwd(), "node_modules/$1")
        },
        {
          find: /^src(.+)/,
          replacement: path.join(process.cwd(), "src/$1")
        }
      ]
    },
    server: {
      port: 8080
    },
    preview: {
      port: 3500
    },
    build: {
      outDir: path.resolve(__vite_injected_original_dirname, "dist"),
      rollupOptions: {
        input: {
          index: path.resolve(__vite_injected_original_dirname, "index.html"),
          main: path.resolve(__vite_injected_original_dirname, "src/main.tsx"),
          editor: path.resolve(__vite_injected_original_dirname, "src/components/editor/index.ts"),
          upload: path.resolve(__vite_injected_original_dirname, "src/components/upload/index.ts"),
          fileThumbnail: path.resolve(__vite_injected_original_dirname, "src/components/file-thumbnail/index.ts"),
          illustrations: path.resolve(__vite_injected_original_dirname, "src/assets/illustrations/index.ts"),
          icons: path.resolve(__vite_injected_original_dirname, "src/assets/icons/index.ts"),
          fonts: path.resolve(__vite_injected_original_dirname, "src/assets/fonts/index.css"),
          image: path.resolve(__vite_injected_original_dirname, "src/components/image/index.ts"),
          drawer: path.resolve(__vite_injected_original_dirname, "src/components/settings/drawer/index.ts"),
          iconify: path.resolve(__vite_injected_original_dirname, "src/components/iconify/index.ts"),
          overrides: path.resolve(__vite_injected_original_dirname, "src/theme/overrides/index.ts"),
          lightbox: path.resolve(__vite_injected_original_dirname, "src/components/lightbox/index.ts")
        },
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            ui: ["@mui/material"]
          }
        }
      },
      emptyOutDir: true,
      minify: true,
      modulePreload: false,
      polyfillModulePreload: false
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxQcm9qZWN0XFxcXGNoZWNrcmFjZVxcXFxyZWFjdCB2LjJcXFxcd2ViLWNoZWNrcmFjZS0yMDI0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxQcm9qZWN0XFxcXGNoZWNrcmFjZVxcXFxyZWFjdCB2LjJcXFxcd2ViLWNoZWNrcmFjZS0yMDI0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Qcm9qZWN0L2NoZWNrcmFjZS9yZWFjdCUyMHYuMi93ZWItY2hlY2tyYWNlLTIwMjQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCwgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcic7XG5pbXBvcnQgeyBWaXRlSW1hZ2VPcHRpbWl6ZXIgfSBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZS1vcHRpbWl6ZXInO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBleHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuLy8gICBwbHVnaW5zOiBbXG4vLyAgICAgcmVhY3QoKSxcbi8vICAgICBjaGVja2VyKHtcbi8vICAgICAgIHR5cGVzY3JpcHQ6IHRydWUsXG4vLyAgICAgICBlc2xpbnQ6IHtcbi8vICAgICAgICAgbGludENvbW1hbmQ6ICdlc2xpbnQgXCIuL3NyYy8qKi8qLntqcyxqc3gsdHMsdHN4fVwiJyxcbi8vICAgICAgIH0sXG4vLyAgICAgICBvdmVybGF5OiB7XG4vLyAgICAgICAgIGluaXRpYWxJc09wZW46IGZhbHNlLFxuLy8gICAgICAgfSxcbi8vICAgICB9KSxcbi8vICAgXSxcbi8vICAgcmVzb2x2ZToge1xuLy8gICAgIGFsaWFzOiBbXG4vLyAgICAgICB7XG4vLyAgICAgICAgIGZpbmQ6IC9efiguKykvLFxuLy8gICAgICAgICByZXBsYWNlbWVudDogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdub2RlX21vZHVsZXMvJDEnKSxcbi8vICAgICAgIH0sXG4vLyAgICAgICB7XG4vLyAgICAgICAgIGZpbmQ6IC9ec3JjKC4rKS8sXG4vLyAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYy8kMScpLFxuLy8gICAgICAgfSxcbi8vICAgICBdLFxuLy8gICB9LFxuLy8gICBzZXJ2ZXI6IHtcbi8vICAgICBwb3J0OiA4MDgwLFxuLy8gICB9LFxuLy8gICBwcmV2aWV3OiB7XG4vLyAgICAgcG9ydDogMzIwMCxcbi8vICAgfSxcbi8vIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XG5cbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgY2hlY2tlcih7XG4gICAgICAgIHR5cGVzY3JpcHQ6IHRydWUsXG4gICAgICAgIGVzbGludDoge1xuICAgICAgICAgIGxpbnRDb21tYW5kOiAnZXNsaW50IFwiLi9zcmMvKiovKi57anMsanN4LHRzLHRzeH1cIicsXG4gICAgICAgIH0sXG4gICAgICAgIG92ZXJsYXk6IHtcbiAgICAgICAgICBpbml0aWFsSXNPcGVuOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgVml0ZUltYWdlT3B0aW1pemVyKHtcbiAgICAgICAgcG5nOiB7XG4gICAgICAgICAgcXVhbGl0eTogNDAsXG4gICAgICAgIH0sXG4gICAgICAgIGpwZWc6IHtcbiAgICAgICAgICBxdWFsaXR5OiA0MCxcbiAgICAgICAgfSxcbiAgICAgICAganBnOiB7XG4gICAgICAgICAgcXVhbGl0eTogNDAsXG4gICAgICAgIH0sXG4gICAgICAgIHN2Zzoge1xuICAgICAgICAgIG11bHRpcGFzczogdHJ1ZSxcbiAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICdwcmVzZXQtZGVmYXVsdCcsXG4gICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgIG92ZXJyaWRlczoge1xuICAgICAgICAgICAgICAgICAgY2xlYW51cE51bWVyaWNWYWx1ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgcmVtb3ZlVmlld0JveDogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnc29ydEF0dHJzJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ2FkZEF0dHJpYnV0ZXNUb1NWR0VsZW1lbnQnLFxuICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbeyB4bWxuczogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB9XSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgXSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFsnQGVtb3Rpb24vc3R5bGVkJ10sXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogW1xuICAgICAgICB7XG4gICAgICAgICAgZmluZDogL15+KC4rKS8sXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnbm9kZV9tb2R1bGVzLyQxJyksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAvXnNyYyguKykvLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYy8kMScpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogODA4MCxcbiAgICB9LFxuICAgIHByZXZpZXc6IHtcbiAgICAgIHBvcnQ6IDM1MDAsXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnZGlzdCcpLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBpbnB1dDoge1xuICAgICAgICAgIGluZGV4OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpLFxuICAgICAgICAgIG1haW46IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvbWFpbi50c3gnKSxcbiAgICAgICAgICBlZGl0b3I6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cy9lZGl0b3IvaW5kZXgudHMnKSxcbiAgICAgICAgICB1cGxvYWQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cy91cGxvYWQvaW5kZXgudHMnKSxcbiAgICAgICAgICBmaWxlVGh1bWJuYWlsOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMvZmlsZS10aHVtYm5haWwvaW5kZXgudHMnKSxcbiAgICAgICAgICBpbGx1c3RyYXRpb25zOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cy9pbGx1c3RyYXRpb25zL2luZGV4LnRzJyksXG4gICAgICAgICAgaWNvbnM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL2ljb25zL2luZGV4LnRzJyksXG4gICAgICAgICAgZm9udHM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL2ZvbnRzL2luZGV4LmNzcycpLFxuICAgICAgICAgIGltYWdlOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMvaW1hZ2UvaW5kZXgudHMnKSxcbiAgICAgICAgICBkcmF3ZXI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cy9zZXR0aW5ncy9kcmF3ZXIvaW5kZXgudHMnKSxcbiAgICAgICAgICBpY29uaWZ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMvaWNvbmlmeS9pbmRleC50cycpLFxuICAgICAgICAgIG92ZXJyaWRlczogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy90aGVtZS9vdmVycmlkZXMvaW5kZXgudHMnKSxcbiAgICAgICAgICBsaWdodGJveDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzL2xpZ2h0Ym94L2luZGV4LnRzJylcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgICB2ZW5kb3I6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgICB1aTogWydAbXVpL21hdGVyaWFsJ11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICAgIG1pbmlmeTogdHJ1ZSxcbiAgICAgIG1vZHVsZVByZWxvYWQ6IGZhbHNlLFxuICAgICAgcG9seWZpbGxNb2R1bGVQcmVsb2FkOiBmYWxzZSxcbiAgICB9LFxuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLE9BQU8sVUFBdUI7QUFDL1csU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sYUFBYTtB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
