import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@expanse-tracker/server/src/routes/app";
import transformer from "trpc-transformer";

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    httpBatchLink({
      url: "http://localhost:3004/trpc",

      async headers() {
        return {
          authorization: `Bearer fasdfasdfsad`,
        };
      },
    }),
  ],
});
