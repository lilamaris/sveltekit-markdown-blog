<script module lang="ts">
    export type AvailableTheme = 'no-preference' | 'light' | 'dark';
    export interface Props {
        controllerSnippet: Snippet<[theme: AvailableTheme, toggleTheme: () => void]>;
    }
</script>

<script lang="ts">
    import { onMount, type Snippet } from 'svelte';

    let { controllerSnippet }: Props = $props();

    let theme: AvailableTheme = $state('no-preference');

    const setTheme = (newTheme: AvailableTheme) => {
        theme = newTheme;
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const handlePreferThemeChange = (e: MediaQueryListEvent) => {
        if (localStorage.getItem('theme') === null) {
            theme = e.matches ? 'dark' : 'light';
        }
    };

    onMount(() => {
        theme = document.documentElement.dataset.theme as AvailableTheme;
        const preferThemeMatches = window.matchMedia('(prefers-color-scheme: dark)');
        preferThemeMatches.addEventListener('change', handlePreferThemeChange);

        return () => {
            preferThemeMatches.removeEventListener('change', handlePreferThemeChange);
        };
    });
</script>

<svelte:head>
    <script lang="ts">
        document.documentElement.dataset.theme =
            localStorage.getItem('theme') === 'dark' ||
            window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
    </script>
</svelte:head>

{@render controllerSnippet(theme, toggleTheme)}
