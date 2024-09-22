import {
  Box,
  Flex,
  Link,
  Text,
  Heading,
  Image,
  Divider,
  Stack,
  Tag,
  Button
} from '@chakra-ui/react'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { differenceInYears } from 'date-fns'
import { GrDocumentPdf } from 'react-icons/gr'

const Page = () => {
  const handleDownload = () => {
    const downloadUrl = '/cv.pdf'
    window.open(downloadUrl, '_blank')
  }

  const age = differenceInYears(new Date(), new Date('2005-11-10'))

  return (
    <Box py={10}>
      <Flex
        justifyContent={'space-between'}
        flexWrap={{ base: 'wrap-reverse', md: 'nowrap' }}
        gridGap={4}
      >
        <Box w={{ base: 'full', md: 'fit-content' }}>
          <Heading>Komiljonov Muxammadbobur</Heading>
          <Text>
            Male, {age} years old, born in 2005, 10th November <br />{' '}
            Uzbekistan, Fergana{' '}
          </Text>
          <Divider my={2} />
          <Heading my={3} size={'lg'}>
            Frontend Developer
          </Heading>
          <Stack spacing={2}>
            <Flex
              as={Link}
              href="mailto:boburkomilovv@gmail.com"
              alignItems={'center'}
              gridGap={2}
            >
              <EmailIcon />
              <Text>boburkomilovv@gmail.com</Text>
            </Flex>
            <Flex alignItems={'center'} gridGap={2}>
              <PhoneIcon />
              <Text>+998908415530</Text>
            </Flex>
          </Stack>
        </Box>
        <Box w={320} h={320} mx={'auto'} rounded={'2xl'} overflow={'hidden'}>
          <Image
            src="/images/bobur.jpg"
            alt="Portret"
            placeholder="blur"
            loading="lazy"
            objectFit={'cover'}
            objectPosition={'center'}
            w={'full'}
            h={'full'}
          />
        </Box>
      </Flex>

      <Divider my={5} />

      <Stack>
        <Heading mb={4}>Experience</Heading>
        <Stack spacing={5}>
          <Stack>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">HPACE</Heading>
              <Text>Jan 2024 - Present</Text>
            </Flex>
            <Text>Frontend Developer</Text>
            <Text>
              At Hpace, I am responsible for the development and maintenance of
              web applications for various projects. My duties include:
              Development of an online cake shop: I implemented key features,
              including a product catalog, shopping cart, and payment system. I
              ensured a high-quality user experience and site performance.
              Working on urgent features: I quickly and efficiently integrated
              new functionalities within multitasking projects, which required
              high speed and accuracy. Multitasking: I participated in several
              projects simultaneously, which helped me develop time management
              and task prioritization skills. In my work, I used modern
              technologies such as React, Next.js, Tailwind CSS, Vue.js, and
              Nuxt.js, ensuring the creation of high-quality, scalable, and
              responsive interfaces.
            </Text>
            <Divider />
          </Stack>
          <Stack>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">Smart-Base</Heading>
              <Text>Nov 2023 - Present</Text>
            </Flex>
            <Text>Frontend Developer</Text>
            <Text>
              At Smart-Base, I worked as a front-end developer as part of a
              large team. My responsibilities included the development and
              maintenance of a large-scale project that required comprehensive
              use of maps and integration of a significant amount of
              information. The project included vehicle monitoring, video
              cameras, and other features. I was responsible for implementing
              complex dashboard pages that displayed all project information,
              providing a convenient and visual interface for users. In addition
              to working as part of a team on large projects, I also
              independently worked on implementing smaller-scale projects. In my
              work, I actively utilized technologies such as React, Redux,
              React-Leaflet, and Leaflet map to create interactive and
              functional interfaces.
            </Text>
            <Divider />
          </Stack>
          <Stack>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">Project: Masterplast</Heading>
              <Text>Apr 2023 - Oct 2023</Text>
            </Flex>
            <Text>Frontend Developer</Text>
            <Text>
              Development of a comprehensive project for creating window frames
              using pure Canvas for rendering models. The project involved
              developing an interactive interface that allows users to visualize
              and customize window frames in real time. Technologies: Nuxt 3,
              Pinia, Canvas API
            </Text>
            <Divider />
          </Stack>
          <Stack>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">ODMSoft</Heading>
              <Text>Aug 2022 - Feb 2023</Text>
            </Flex>
            <Text>Frontend Developer</Text>
            <Text>
              At ODMSoft, I worked as a front-end developer, where the main
              project was the creation of a PDF editor. In this project, I was
              responsible for developing the interface and functionality for
              working with PDF documents. Technologies: Nuxt 3, Vue.js
            </Text>
            <Divider />
          </Stack>
          <Stack>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">Freelance</Heading>
              <Text>May 2021 - Aug 2022</Text>
            </Flex>
            <Text>Frontend Developer</Text>
            <Text>
              I worked as a freelancer, taking on various projects for different
              clients. During this period, I participated in the development of
              numerous projects, including the creation of web applications and
              user interfaces. The main technologies I used included React and
              Vue.js, along with other tools and libraries necessary for the
              successful completion of freelance projects. My responsibilities
              included requirements analysis, functionality development, API
              integration, and ensuring a high-quality user experience. I worked
              on projects of varying scale and complexity, which allowed me to
              expand my skills and experience in various areas of web
              development.
            </Text>
          </Stack>
          {/* <Stack>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">ODMSoft</Heading>
              <Text>Nov 2022 - Apr 2023</Text>
            </Flex>
            <Text>Frontend Developer</Text>
            <Flex py={3} alignItems="center" gridGap={1}>
              <Badge colorScheme="green">Stack </Badge>
              <Text>Nuxt 3, Tailwind</Text>
            </Flex>
            <Text>
              I worked on interface development in a team of developers and was
              responsible for building our own UI kit. I dealt with a massive
              amount of data and collaborated with backend developers.
            </Text>
            <Divider />
          </Stack>
          <Stack>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">Axie Labs</Heading>
              <Text>May 2022 - Oct 2022</Text>
            </Flex>
            <Text>Intern Frontend Developer</Text>
            <Flex py={3} alignItems="center" gridGap={1}>
              <Badge colorScheme="green">Stack </Badge>
              <Text>Nuxt 3</Text>
            </Flex>
            <Text>
              I completed an internship in project work at Axie Labs. I worked
              on the frontend part of the project, focusing on statistics for a
              cryptocurrency game.
            </Text>
          </Stack> */}
        </Stack>
      </Stack>

      <Divider my={5} />

      <Stack>
        <Heading mb={4}>Courses</Heading>
        <Flex justifyContent="space-between">
          <Box>
            <Heading size="md">KTS Beginner React developer</Heading>
            <Text>KTS Studio, React developer</Text>
          </Box>
          <Box>
            <Text>2022 </Text>
          </Box>
        </Flex>
      </Stack>

      <Divider my={5} />

      <Stack>
        <Heading mb={4}>Skills</Heading>
        <Flex gridGap={2} flexWrap={'wrap'}>
          <Tag size={'lg'} variant="solid" colorScheme="twitter">
            Typescript
          </Tag>
          <Tag size={'lg'} variant="solid" colorScheme="blue">
            React
          </Tag>
          <Tag size={'lg'} variant="solid" colorScheme="green">
            Vue
          </Tag>
          <Tag size={'lg'} variant="solid" colorScheme="cyan">
            Tailwind
          </Tag>
          <Tag size={'lg'} variant="solid" colorScheme="orange">
            Git
          </Tag>
          <Tag size={'lg'} variant="solid" colorScheme="purple">
            Redux
          </Tag>
          <Tag size={'lg'} variant="solid" colorScheme="green">
            Vuex
          </Tag>
          <Tag size={'lg'} variant="solid" colorScheme="yellow">
            Pinia
          </Tag>
        </Flex>
      </Stack>

      <Divider my={5} />

      <Stack>
        <Heading mb={4}>About me</Heading>
        <Text>
          As a frontend developer, I bring a strong collaborative spirit to the
          team, ensuring smooth communication and effective cooperation with
          colleagues. My punctuality ensures that projects are delivered on
          time, and I take pride in my work ethic, always striving to deliver
          high-quality and efficient so
        </Text>
      </Stack>

      <Box mt={10}>
        <Button
          onClick={handleDownload}
          rightIcon={<GrDocumentPdf />}
          colorScheme="teal"
        >
          Download CV
        </Button>
      </Box>
    </Box>
  )
}

export default Page
