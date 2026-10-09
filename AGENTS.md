<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep multilingual school copy and support course arrays in local content modules so additions preserve a single editable source without database dependencies.
- Keep the founder biography and its translated qualification groups in a dedicated local content module, shared by the visible profile and search metadata, so credentials have one editable source.
- Derive stage-specific subject and teacher groups from support course content so all three sections stay consistent when subjects change.
- Match support photos by explicit stage keys rather than array position so course reordering preserves editorial photo assignments.
- Compute academic seasons through the shared September-boundary helper; refresh the displayed season while a page remains open so seasonal changes never require manual updates.
- Keep photo collections in the local content module using CDN asset pointers; use the shared Embla school carousel for homepage media and repeated section items with viewport-aware autoplay, pause and reduced-motion support so media stays editable and accessible.
- Use compressed photo asset pointers for displayed school media and keep reveal content visible before hydration so slow connections never produce blank sections.
- Keep uploaded videos in the local content module as CDN pointers and render them through the visibility-aware video component; disable timed slide advance for video carousels so playback is not interrupted.
- Asset URLs are made absolute via src/lib/cdn.ts so photos load on custom domains not hosted by Lovable.
- Keep school section rendering shared between the complete homepage and dedicated content routes, with navigation in one typed local module, so page links preserve existing content and media without duplication.
- Keep factual multilingual FAQ answers in local content and derive support subjects from existing course data, so visible answers and FAQ search metadata stay consistent without invented school policies.
- Keep the selected language in a root-scoped provider so navigating between school pages preserves the user's language without browser-storage hydration mismatches.
