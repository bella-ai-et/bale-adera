import { t } from "@worker/trpc/trpc-instance";
import { exampleTableDataRouter } from "@worker/trpc/routes/example-table-data";

export const appRouter = t.router({
  exampleTableData: exampleTableDataRouter,
});

export type AppRouter = typeof appRouter;
