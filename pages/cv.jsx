import {
  Box,
  Flex,
  Link,
  Text,
  Heading,
  Image,
  Divider,
  Stack,
  Badge,
  Tag,
  Button
} from '@chakra-ui/react'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'

import { GrDocumentPdf } from 'react-icons/gr'

const Page = () => {
  const handleDownload = () => {
    const downloadUrl = '/cv.pdf'
    window.open(downloadUrl, '_blank')
  }

  return (
    <Box py={10}>
      <Flex justifyContent={'space-between'} gridGap={2}>
        <Box>
          {/* <Text>Komiljonov Muxammadbobur</Text> */}
          <Heading>Komiljonov Muxammadbobur</Heading>
          <Text>
            Male, 18 years old, born in 2005, 10th November <br /> Uzbekistan,
            Fergana{' '}
          </Text>
          <Divider my={2} />
          <Heading my={3}>Frontend Developer</Heading>
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
        <Box w={320} h={320} rounded={'2xl'} overflow={'hidden'}>
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
          </Stack>
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
        <Flex gridGap={2}>
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
