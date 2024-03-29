// post.seeder.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const titles = [
  "What are some good resources for learning JavaScript?",
  "Can anyone recommend a good tutorial for React?",
  "I'm having trouble understanding async/await in JavaScript. Can anyone explain it in simple terms?",
  "What's the difference between SQL and NoSQL databases? Which one should I use for my project?",
  "I'm new to Python. What libraries should I learn to use first?",
  "What are some best practices for writing clean, maintainable code?",
  "Can anyone explain the concept of closures in JavaScript?",
  "What's the best way to learn about data structures and algorithms?",
  "I'm having trouble understanding the concept of 'state' in React. Can anyone help?",
  "What are some common mistakes beginners make when learning to code?",
  "What are the key differences between Python 2 and Python 3?",
  "How can I improve the performance of my SQL queries?",
  "What are some good resources for learning about cybersecurity?",
  "What's the best way to handle exceptions in Java?",
  "What are some good practices for debugging code?",
  "What are the key differences between Angular and React?",
  "What are some good resources for learning about machine learning?",
  "What's the best way to learn about web development?",
  "What are some good practices for writing testable code?",
  "What are the key differences between C and C++?",
  "What are some good resources for learning about data science?",
  "What's the best way to learn about mobile app development?",
  "What are some good practices for writing secure code?",
  "What are the key differences between Java and JavaScript?",
  "What are some good resources for learning about artificial intelligence?",
  "What's the best way to learn about game development?",
  "What are some good practices for writing efficient code?",
  "What are the key differences between front-end and back-end development?",
  "What are some good resources for learning about cloud computing?",
  "What's the best way to learn about database design?",
  "What are some good practices for writing scalable code?",
  "What are the key differences between functional and object-oriented programming?",
  "What are some good resources for learning about software architecture?",
  "What's the best way to learn about network programming?",
  "What are some good practices for writing maintainable code?",
  "What are the key differences between HTML and HTML5?",
  "What are some good resources for learning about operating systems?",
  "What's the best way to learn about embedded systems programming?",
  "What are some good practices for writing readable code?",
  "What are the key differences between CSS and CSS3?",
  "What are some good resources for learning about computer graphics?",
  "What's the best way to learn about algorithm design?",
  "What are some good practices for writing robust code?",
  "What are the key differences between synchronous and asynchronous programming?",
  "What are some good resources for learning about web design?",
  "What's the best way to learn about software testing?",
  "What are some good practices for writing modular code?",
  "What are the key differences between static and dynamic typing?",
  "What are some good resources for learning about user interface design?",
  "What's the best way to learn about data visualization?",
  "What are some good practices for writing high-performance code?",
  "What are the key differences between interpreted and compiled languages?",
  "What are some good resources for learning about computer networks?",
  "What's the best way to learn about software engineering principles?",
  "What are some good practices for writing cross-platform code?",
  "What are the key differences between relational and non-relational databases?",
  "What are some good resources for learning about web servers?",
  "What's the best way to learn about programming paradigms?",
  "What are some good practices for writing reusable code?",
  "What are the key differences between client-side and server-side rendering?",
];

const contents = [
  "I've been learning JavaScript for a while now, and I've found some really helpful resources that might benefit you too. Here are a few that I recommend: [list of resources]",
  "I've recently started learning React myself, and I found this tutorial to be extremely helpful: [link to the tutorial]. It covers everything from the basics to more advanced concepts.",
  "Understanding async/await can be tricky at first, but I'll try to explain it in simple terms. Essentially, async/await allows you to write asynchronous code that looks and behaves like synchronous code. When you mark a function as 'async', it means that it will always return a promise. And when you use the 'await' keyword inside an async function, it pauses the execution of the function until the promise is resolved. This makes it easier to work with asynchronous code, especially when dealing with tasks like fetching data from a server.",
  "SQL and NoSQL databases serve different purposes, so the choice depends on the specific requirements of your project. SQL databases are relational and are good for applications that require complex queries and transactions, while NoSQL databases are non-relational and are better suited for handling large volumes of unstructured data. Consider factors like data structure, scalability, and query flexibility when choosing between the two.",
  "Python offers a wide range of libraries for various purposes. As a beginner, I recommend starting with libraries like NumPy and Pandas for data manipulation and analysis, Matplotlib for data visualization, and requests for making HTTP requests. These libraries are widely used and have extensive documentation and community support.",
  "Writing clean, maintainable code is essential for any developer. Some best practices include following coding conventions, writing modular and reusable code, using meaningful variable names, documenting your code, and regularly refactoring to improve readability and maintainability.",
  "Closures are a fundamental concept in JavaScript that can be a bit tricky to grasp at first. Essentially, a closure is a function that has access to its own scope, as well as the scope of its outer function, even after the outer function has finished executing. This allows you to create private variables and encapsulate functionality within a function.",
  "Learning about data structures and algorithms is crucial for becoming a proficient programmer. I recommend starting with basic data structures like arrays, linked lists, stacks, and queues, and then gradually moving on to more advanced topics like trees, graphs, sorting algorithms, and searching algorithms.",
  "Understanding 'state' in React is essential for building dynamic and interactive user interfaces. In simple terms, state is an object that stores data relevant to a component. When the state of a component changes, React automatically re-renders the component to reflect the updated state.",
  "When learning to code, beginners often make mistakes like not understanding basic programming concepts, jumping into complex projects too soon, not seeking help when they're stuck, and not practicing enough. It's important to take your time, practice regularly, and seek guidance from experienced developers.",
  "Python 2 and Python 3 are both popular versions of the Python programming language, but there are some key differences between them. Python 3 is the latest version and has many improvements and new features compared to Python 2. Some of the key differences include print statement syntax, Unicode support, and division behavior.",
  "Improving the performance of SQL queries can be done in several ways, such as optimizing the query itself by using indexes, minimizing the number of rows returned, and avoiding expensive operations like joins and subqueries. Additionally, optimizing the database schema and server configuration can also help improve query performance.",
  "Cybersecurity is a vast field with many resources available for learning. Some good starting points include online courses, books, blogs, and forums dedicated to cybersecurity. It's also helpful to practice hands-on exercises and participate in capture the flag (CTF) competitions to gain practical experience.",
  "Handling exceptions effectively is important in Java to ensure robust and reliable software. Some best practices include using try-catch blocks to handle exceptions gracefully, logging exceptions for debugging purposes, and throwing custom exceptions to provide meaningful error messages to users.",
  "Debugging code is a skill that every developer should master. Some good practices include using debugging tools like breakpoints and logging statements, reproducing the issue consistently, isolating the problem, and systematically testing potential solutions.",
  "Angular and React are both popular JavaScript frameworks for building single-page applications, but they have some key differences. Angular is a full-fledged MVC framework with a steep learning curve, while React is a lightweight library for building user interfaces. React emphasizes component-based architecture and one-way data flow.",
  "Machine learning is a complex field with many resources available for learning. Some good starting points include online courses like those offered by Coursera and Udacity, books like 'Introduction to Statistical Learning' and 'Hands-On Machine Learning with Scikit-Learn and TensorFlow', and tutorials and documentation provided by machine learning libraries like TensorFlow and scikit-learn.",
  "Web development encompasses a wide range of technologies and concepts, so the best way to learn depends on your specific interests and goals. However, I recommend starting with HTML, CSS, and JavaScript, as they form the foundation of web development. From there, you can explore frontend frameworks like React or Vue.js, backend frameworks like Node.js or Django, and other technologies like databases, APIs, and deployment.",
  "Writing testable code is important for ensuring the quality and reliability of your software. Some good practices include writing modular and decoupled code, using dependency injection to manage dependencies, and designing code with testing in mind from the outset.",
  "C and C++ are both powerful programming languages commonly used for system programming, game development, and performance-critical applications, but they have some key differences. C++ is an extension of C with additional features like classes, templates, and object-oriented programming, while C is a simpler language focused on procedural programming.",
  "Data science is an interdisciplinary field that combines statistics, machine learning, and domain knowledge to extract insights from data. Some good starting points for learning about data science include online courses like those offered by Coursera and edX, books like 'Python for Data Analysis' and 'Introduction to Statistical Learning', and tutorials and documentation provided by data science libraries like Pandas and scikit-learn.",
  "Mobile app development is a broad field that encompasses various platforms and technologies. The best way to learn depends on the specific platform you're interested in (e.g., iOS or Android) and whether you prefer native app development or cross-platform development. Some good starting points include learning the programming languages and development frameworks used for mobile app development, as well as familiarizing yourself with the app store submission process and mobile app design principles.",
  "Writing secure code is essential for protecting your software from security vulnerabilities and attacks. Some good practices include validating input data, sanitizing user input to prevent SQL injection and cross-site scripting (XSS) attacks, using encryption to protect sensitive data, and keeping software dependencies up to date to patch security vulnerabilities.",
  "Java and JavaScript are both popular programming languages used for different purposes. Java is a statically typed language commonly used for building backend services, desktop applications, and Android apps, while JavaScript is a dynamically typed language primarily used for building dynamic web applications and browser-based user interfaces.",
  "Artificial intelligence (AI) is a rapidly growing field with many resources available for learning. Some good starting points include online courses like those offered by Coursera and Udacity, books like 'Artificial Intelligence: A Modern Approach' and 'Deep Learning', and tutorials and documentation provided by AI libraries like TensorFlow and PyTorch.",
  "Game development is a challenging but rewarding field that requires a combination of technical skills and creativity. The best way to learn about game development depends on your specific interests and goals, but some good starting points include learning game engines like Unity or Unreal Engine, studying game design principles, and practicing coding and game development techniques.",
  "Writing efficient code is important for optimizing the performance and scalability of your software. Some good practices include using algorithms with optimal time and space complexity, minimizing redundant computations, avoiding unnecessary memory allocations, and profiling your code to identify performance bottlenecks.",
  "Front-end and back-end development are two distinct roles in web development, each with its own set of responsibilities and technologies. Front-end developers focus on building user interfaces and client-side functionality using technologies like HTML, CSS, and JavaScript, while back-end developers focus on building server-side logic and data processing using technologies like Node.js, Python, and Java.",
  "Cloud computing is a rapidly evolving field with many resources available for learning. Some good starting points include online courses like those offered by AWS and Google Cloud, books like 'Cloud Computing: Concepts, Technology & Architecture' and 'Architecting the Cloud', and tutorials and documentation provided by cloud service providers.",
  "Database design is a critical aspect of software development that involves designing the structure and organization of databases to store and manage data efficiently. Some good starting points for learning about database design include studying database normalization, entity-relationship modeling, and SQL query optimization.",
  "Writing scalable code is important for ensuring that your software can handle increasing workloads and user traffic. Some good practices include designing code with scalability in mind, using caching and load balancing to distribute traffic efficiently, and optimizing database queries and server performance.",
  "Functional and object-oriented programming are two popular programming paradigms with distinct approaches to structuring code and modeling data. Functional programming emphasizes immutability, pure functions, and higher-order functions, while object-oriented programming focuses on objects, classes, and inheritance.",
  "Software architecture is a broad field that encompasses the design and organization of software systems to meet specific requirements and constraints. Some good starting points for learning about software architecture include studying design patterns, architectural styles like microservices and monolithic architecture, and software modeling techniques like UML.",
  "Network programming involves writing code that communicates over a network, such as sending and receiving data between devices or services. The best way to learn about network programming depends on your specific goals, but some good starting points include learning socket programming, network protocols like TCP/IP and HTTP, and network security principles.",
  "Writing maintainable code is essential for ensuring that your software remains easy to understand, modify, and extend over time. Some good practices include following coding conventions, writing self-documenting code, using meaningful variable names, and refactoring code regularly to improve readability and maintainability.",
  "HTML and HTML5 are both versions of the Hypertext Markup Language used for creating web pages, but HTML5 introduces new features and improvements over HTML. Some key differences include support for multimedia elements like audio and video, new semantic elements like <header> and <footer>, and improved support for mobile devices and responsive web design.",
  "Operating systems are the software that manages computer hardware and provides services for computer programs. Some good starting points for learning about operating systems include studying operating system concepts like processes, memory management, file systems, and scheduling algorithms, as well as exploring different operating systems like Windows, macOS, and Linux.",
  "Embedded systems programming involves writing code for specialized hardware devices with limited resources and specific requirements. The best way to learn about embedded systems programming depends on your specific interests and goals, but some good starting points include learning microcontroller programming, embedded C programming, and hardware interfacing techniques.",
  "Writing readable code is important for ensuring that your code is easy to understand and maintain by yourself and others. Some good practices include following coding conventions, using meaningful variable names, writing self-documenting code, and organizing code into logical modules and functions.",
  "CSS and CSS3 are both versions of the Cascading Style Sheets language used for styling web pages, but CSS3 introduces new features and improvements over CSS. Some key differences include support for advanced selectors, animations and transitions, media queries for responsive design, and new layout modules like Flexbox and Grid.",
  "Computer graphics is a field that involves creating and manipulating visual content using computers. Some good starting points for learning about computer graphics include studying graphics algorithms like rasterization and ray tracing, learning graphics libraries like OpenGL and WebGL, and exploring topics like 3D modeling and animation.",
  "Algorithm design is a fundamental skill for any programmer, as it involves creating step-by-step procedures for solving specific problems efficiently. Some good starting points for learning about algorithm design include studying common algorithms like sorting and searching algorithms, learning algorithm analysis techniques like time and space complexity, and practicing problem-solving with algorithmic challenges.",
  "Writing robust code is important for ensuring that your software can handle unexpected inputs and edge cases without crashing or producing incorrect results. Some good practices include validating input data, handling errors gracefully, writing defensive code, and testing your code thoroughly to uncover bugs and vulnerabilities.",
  "Synchronous and asynchronous programming are two common approaches to handling tasks that take time to complete. Synchronous programming executes tasks sequentially, blocking the execution of subsequent tasks until the current task is complete, while asynchronous programming allows tasks to run concurrently, enabling non-blocking execution and improved performance.",
  "Web design involves creating the visual and interactive elements of websites, such as layouts, colors, fonts, and user interfaces. Some good starting points for learning about web design include studying design principles like typography, color theory, and user experience (UX) design, as well as learning design tools like Adobe Photoshop and Sketch.",
  "Software testing is a critical aspect of software development that involves verifying and validating software to ensure that it meets the specified requirements and functions correctly. Some good starting points for learning about software testing include studying testing methodologies like unit testing and integration testing, learning testing tools like JUnit and Selenium, and practicing test-driven development (TDD).",
  "Writing modular code is important for breaking down complex software systems into smaller, reusable components that can be easily maintained and extended. Some good practices include following the single responsibility principle, using dependency injection to manage dependencies, and designing code with separation of concerns in mind.",
  "Static and dynamic typing are two common approaches to type checking in programming languages. Static typing requires variables to be explicitly declared with a specific data type at compile time, while dynamic typing allows variables to hold values of any type and performs type checking at runtime.",
  "User interface design involves creating the visual and interactive elements of software applications to enhance usability and user experience. Some good starting points for learning about user interface design include studying design principles like visual hierarchy, affordances, and feedback, as well as learning design tools like Adobe XD and Figma.",
  "Data visualization is the process of representing data visually to help users understand and interpret complex information more easily. Some good starting points for learning about data visualization include studying visualization techniques like charts and graphs, learning visualization tools like Tableau and D3.js, and exploring data visualization libraries and frameworks.",
  "Writing high-performance code is important for optimizing the speed and efficiency of your software. Some good practices include using algorithms with optimal time and space complexity, minimizing redundant computations, avoiding unnecessary memory allocations, and profiling your code to identify performance bottlenecks.",
  "Interpreted and compiled languages are two common approaches to translating source code into machine code. Interpreted languages execute code line by line at runtime, while compiled languages translate code into machine code before execution. Some languages, like Java, use a combination of interpretation and compilation (e.g., bytecode compilation).",
  "Computer networks are the infrastructure that enables devices to communicate and share data with each other. Some good starting points for learning about computer networks include studying network protocols like TCP/IP and HTTP, learning about network topologies and architectures, and exploring network security principles like encryption and firewalls.",
  "Software engineering principles are fundamental concepts and practices that guide the development of high-quality software systems. Some key software engineering principles include requirements analysis, design patterns, software architecture, testing, and project management.",
  "Writing cross-platform code is important for ensuring that your software can run on multiple operating systems and devices. Some good practices include using platform-independent libraries and frameworks, following coding conventions that work across platforms, and testing your code on different platforms to ensure compatibility.",
  "Relational and non-relational databases serve different purposes and have distinct characteristics. Relational databases store data in tables with predefined schemas and support complex queries and transactions, while non-relational databases store data in flexible, schema-less formats and are optimized for scalability and performance.",
  "Web servers are software applications that handle client requests and deliver web content over the internet. Some good starting points for learning about web servers include studying server-side programming languages like Node.js and Python, learning about web server technologies like Apache and Nginx, and exploring server-side frameworks like Express and Django.",
  "Programming paradigms are fundamental approaches to structuring code and solving problems in programming languages. Some common programming paradigms include procedural programming, object-oriented programming, functional programming, and declarative programming.",
  "Writing reusable code is important for maximizing code reusability, maintainability, and efficiency. Some good practices include following the DRY (Don't Repeat Yourself) principle, creating modular and decoupled components, and designing code with flexibility and extensibility in mind.",
  "Client-side and server-side rendering are two common approaches to rendering web content in web applications. Client-side rendering involves rendering content in the browser using JavaScript, while server-side rendering involves rendering content on the server and sending the pre-rendered HTML to the client.",
];


export async function seedPosts(users, forums) {
  console.log("------------ Starting to seed posts...");
  const posts = [];
  for (let i = 0; i < forums.length; i++) {
    const forum = forums[i];
    const ownerId = forum.ownerUserId;
    const moderator = forum.moderators.find(moderator => moderator.userId !== ownerId);
    const otherUsers = users.filter(user => user.id !== ownerId && user.id !== moderator.userId);

    const ownerAttachment = await prisma.attachment.create({
      data: {
        name: `${faker.system.fileName()}.jpg`,
        type: 'image/jpeg',
        url: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
      },
    });

    const randomIndex = Math.floor(Math.random() * titles.length);
    const ownerPost = await prisma.post.create({
      data: {
        title: titles[randomIndex],
        content: contents[randomIndex],
        userId: ownerId,
        forumId: forum.id,
        isPinned: true,
        isVisible: true,
        slug: faker.lorem.slug(),
        createdAt: new Date(),
        updatedAt: new Date(),
        commentsCount: faker.number.int({ min: 0, max: 100 }),
        viewsCount: faker.number.int({ min: 0, max: 1000 }),
        votesCount: faker.number.int({ min: 0, max: 500 }),
        upvotesCount: faker.number.int({ min: 0, max: 500 }),
        downvotesCount: faker.number.int({ min: 0, max: 500 }),
      },
    });
    console.log(`------------ Post with id ${ownerPost.id} created by owner.`);

    await prisma.postAttachment.create({
      data: {
        postId: ownerPost.id,
        attachmentId: ownerAttachment.id,
      },
    });

    const moderatorAttachment = await prisma.attachment.create({
      data: {
        name: `${faker.system.fileName()}.jpg`,
        type: 'image/jpeg',
        url: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
      },
    });

    const moderatorPost = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        userId: moderator.userId,
        forumId: forum.id,
        isPinned: true,
        isVisible: true,
        slug: faker.lorem.slug(),
        createdAt: new Date(),
        updatedAt: new Date(),
        commentsCount: faker.number.int({ min: 0, max: 100 }),
        viewsCount: faker.number.int({ min: 0, max: 1000 }),
        votesCount: faker.number.int({ min: 0, max: 500 }),
        upvotesCount: faker.number.int({ min: 0, max: 500 }),
        downvotesCount: faker.number.int({ min: 0, max: 500 }),
      },
    });
    console.log(`------------ Post with id ${moderatorPost.id} created by moderator.`);

    await prisma.postAttachment.create({
      data: {
        postId: moderatorPost.id,
        attachmentId: moderatorAttachment.id,
      },
    });

    for (let j = 0; j < 3; j++) {
      const userAttachment = await prisma.attachment.create({
        data: {
          name: faker.system.fileName(),
          type: faker.system.commonFileType(),
        url: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
        },
      });

      const randomIndex = Math.floor(Math.random() * titles.length);
      const userPost = await prisma.post.create({
        data: {
          title: titles[randomIndex],
          content: contents[randomIndex],
          userId: otherUsers[j].id,
          forumId: forum.id,
          isPinned: false,
          isVisible: true,
          slug: faker.lorem.slug(),
          createdAt: new Date(),
          updatedAt: new Date(),
          commentsCount: faker.number.int({ min: 0, max: 100 }),
          viewsCount: faker.number.int({ min: 0, max: 1000 }),
          votesCount: faker.number.int({ min: 0, max: 500 }),
          upvotesCount: faker.number.int({ min: 0, max: 500 }),
          downvotesCount: faker.number.int({ min: 0, max: 500 }),
        },
      });
      console.log(`------------ Post with id ${userPost.id} created by user.`);

      await prisma.postAttachment.create({
        data: {
          postId: userPost.id,
          attachmentId: userAttachment.id,
        },
      });

      posts.push(userPost);
    }
    posts.push(ownerPost, moderatorPost);
  }

  console.log("------------ Finished seeding posts.");
  return posts;
}
