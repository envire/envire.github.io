---
id: tutorial_writing_tutorials
title: Writing Tutorials
---

## Source Code
Source code accompanying the tutorials should be stored in the
[Envire Tutorials Git](https://github.com/envire/envire-tutorials).

Each source code example should be accompanied by a CMakeLists.txt containing a target to build the example. That way we can ensure
consistency between the examples and the api that they are using.

### Embedding Source Code Snippets
To ensure consistency between snippets and actual code, the snippets from the tutorials git can be directly embedded into the markdown files.

To do that, the snippets need to be marked in the source file using

**//#snippet_begin:[id]**

and

**//#snippet_end:[id]**

Example:

```c++
int main(int argc, char **argv)
{
//#snippet_begin:graph_viz_example_thread_code
  QtThreadedWidget<EnvireVisualizerWindow> widget;
  widget.start();
//#snippet_end:graph_viz_example_thread_code
  while(true);
  return 0;
}
```
A snippet can be embedded using the following syntax:

```html
<pre><code data-snippetId="[id]" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_visualizer_example/VisualizerExample.cpp"></code></pre>
```
The **[id]** should be the same as in the snippet marker. Due to security
restrictions in javascipt, the file can only be hosted on github.
Linking to files on other hosts is not possible.

The **[id]** needs to be unique per file. Additionally ids should not contain
each other. If one id is the substring of another id, the code will break.
