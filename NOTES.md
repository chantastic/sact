- Create simple 1-page mock in tldraw
- Next legitimately has my favorite raw starter
  - There's already dark-mode light mode text and backdrop setup (globals.css)
  - Google Fonts are already setup, so I can easily grab the one I want for this project
  - Quiclky setup the Metadata I care about for this tiny project
  - And get to work styling with tailwind…
- I want a simple layout optimized for my phone but doesn't look terrible on larger screens. For that, I…
  - Use 100% of the available viewport with `dvh` and `dvw`. This is a dynamic viewport that, unlike `vh` take into account mobile browser chrome. Which is great
    - Tailwind doesn't have values for this but I can use their bracket syntax to provide literal values — very nice.
  - Then I have a little centered element that responds minimally to the orientation of the window
  - One little hack I do with tailwind is to use string literals. i can minimally organize my classes without using having to extract them in any way. This isn't great. The only real downside is that you're opting out of prettier for formatting
- Draw the rest of the UI Owl
  - I always like to start with the markup.
    - `main` to wrap mark the main section of our page.
    - An `ol` ("ordered list") of events
      - We'll render this as `grid`
      - And, in lieu of state, we'll provide a 19-item array filed with null.
      - Each item is a `li` ("list time")
        - Because our button content is an emoji, I'd like to describe it with an `aria-label`
        - I'll use a static one for incomplete now and we'll come back to it.
    - finally we have our action buttons.
      - because these use emoji, we have an aria label to provide a discription
- Ok. That's the visual change I'm gonna show you. You have to check out the final app to see the rest.
- Let's jump into the coding.
- First things first, let's turn this array to `state` with `useState`

  - I'll use the most delicate term I can think of for this "evacuations"
  - I create a variable for this, so that I can easily and clearly add as shared type (defined above)
  - We hook up our actions (solo, partner, and "prefer not to say")
    - Those update state by finding the next `null` and replacing it with the provided value
    - Then we use that state to render the manner we used, in the grid
    - And provide a correct statement about that method to assistive technologise ("completed solo", "…with a partner", or "…in shame" lol)
    - YES. I'm just using the array index. No, it's not a super big deal here because the size of the array isn't changing between renders.
    - Finally, we render the remaining count by filtering `null` values


-

- And I'll leave a little surprise for you when you get to 20

Things to demo:

- Nextjs really can't be beat for ease of setup.
- I start of my projects with this kind "mobile only" css setup.
  - It just defaults to a mobile-ish shape that will be 100% of the dynamic viewport (using `dv*` units)
  - I lov ethat next just has that global.css file ready to go
- I really like the `Tilt Warp` Google font for this. It's an extremely limited font but I don't have much text.
  - Again, Next, layouts and next/font make this super easy to add

Followup:

- post on emoji effect from tl-draw
