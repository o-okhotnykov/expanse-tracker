import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@expanse-tracker/server/src/routes/app";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3004/trpc",
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: `Bearer fasdfasdfsad`,
        };
      },
    }),
  ],
});
