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
- Derive stage-specific subject and teacher groups from support course content so all three sections stay consistent when subjects change.
- Compute academic seasons through the shared September-boundary helper; refresh the displayed season while a page remains open so seasonal changes never require manual updates.
- Keep photo collections in the local content module using CDN asset pointers; use the shared Embla school carousel for homepage media and repeated section items with viewport-aware autoplay, pause and reduced-motion support so media stays editable and accessible.
