import { execFile } from "node:child_process";
import { mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execute = promisify(execFile);
const root = decodeURIComponent(new URL("../", import.meta.url).pathname);
const scratch = await mkdtemp(join(tmpdir(), "ctx9-isolated-install-"));

try {
  for (const name of ["@ctx9/ui", "@ctx9/web-auth"]) {
    await execute(
      "pnpm",
      ["--filter", name, "pack", "--pack-destination", scratch],
      { cwd: root },
    );
  }
  const archives = (await readdir(scratch)).filter((name) =>
    name.endsWith(".tgz"),
  );
  const ui = archives.find((name) => name.startsWith("ctx9-ui-"));
  const auth = archives.find((name) => name.startsWith("ctx9-web-auth-"));
  if (!ui || !auth) throw new Error("Isolated install archives missing.");
  await writeFile(
    join(scratch, "package.json"),
    JSON.stringify({
      private: true,
      type: "module",
      dependencies: {
        "@ctx9/ui": `file:./${ui}`,
        "@ctx9/web-auth": `file:./${auth}`,
        react: "19.1.0",
        "react-dom": "19.1.0",
      },
      devDependencies: {
        typescript: "5.9.3",
        "@types/react": "19.1.17",
        "@types/react-dom": "19.1.11",
      },
      overrides: { "motion-dom": "12.23.23", "motion-utils": "12.23.6" },
    }),
  );
  await writeFile(
    join(scratch, "consumer.tsx"),
    `
import { Button, Input, Checkbox, ColorPicker, ShimmerBorderButton, FunkyLoaderButton, DataTable, createDataTableColumnHelper, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@ctx9/ui';
import * as auth from '@ctx9/web-auth';
import { renderToStaticMarkup } from 'react-dom/server';
import { checkStyleSource } from '@ctx9/ui/style-policy';
interface Row { id: string; name: string }
const helper = createDataTableColumnHelper<Row>();
const columns = [helper.accessor('name', { header: 'Name' })];
const app = <><Button variant="primary">Save</Button><Input aria-label="Name" />
<Button variant="secondary" preset="dateTimeMenu" state="dateTimeIntended">Schedule</Button>
<ShimmerBorderButton preset="upgrade">Upgrade</ShimmerBorderButton>
<FunkyLoaderButton preset="pricing">Select plan</FunkyLoaderButton>
<Checkbox aria-label="Selected" /><DataTable data={[{ id: '1', name: 'Example' }]}
columns={columns} getRowId={row => row.id} emptyMessage="Empty" />
<ColorPicker value="#3275F8" onChange={() => undefined} layer="raised" />
<AlertDialog><AlertDialogTrigger asChild><Button>Confirm action</Button></AlertDialogTrigger>
<AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirm</AlertDialogTitle>
<AlertDialogDescription>Confirm this action.</AlertDialogDescription></AlertDialogHeader>
<AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel>
<AlertDialogAction>Continue</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></>;
if (!renderToStaticMarkup(app).includes('Save')) throw new Error('Consumer render failed');
if (!Object.keys(auth).length) throw new Error('Auth package export failed');
if (checkStyleSource('src/page.tsx', "import { Button } from '@ctx9/ui'; const view = <Button className='bg-red-500' />;").length !== 1) throw new Error('Consumer policy failed');
`,
  );
  await execute(
    "npm",
    ["install", "--ignore-scripts", "--no-audit", "--no-fund"],
    { cwd: scratch, maxBuffer: 4_000_000 },
  );
  const compiler = join(scratch, "node_modules", "typescript", "bin", "tsc");
  await execute(
    process.execPath,
    [
      compiler,
      "consumer.tsx",
      "--outDir",
      "build",
      "--jsx",
      "react-jsx",
      "--module",
      "NodeNext",
      "--target",
      "ES2023",
      "--skipLibCheck",
      "--strict",
    ],
    { cwd: scratch },
  );
  await execute(process.execPath, [join(scratch, "build", "consumer.js")], {
    cwd: scratch,
  });
  console.log(
    "Isolated package install, typecheck, render and style policy passed.",
  );
} finally {
  await rm(scratch, { recursive: true, force: true });
}
