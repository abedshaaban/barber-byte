import {
  EyeClosedIcon as ClosedEye,
  HomeIcon as Home,
  InfoCircledIcon as InfoCircle,
  LetterCaseLowercaseIcon as LowerCaseLetter,
  EyeOpenIcon as OpenEye,
  PersonIcon as Person,
  LetterCaseUppercaseIcon as UpperCaseLetter
} from '@radix-ui/react-icons'

export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

const EightPlus = (props: IconProps) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="black"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3.96599 11.9659C3.38076 11.9659 2.86372 11.8622 2.41485 11.6548C1.96883 11.4446 1.62082 11.1563 1.37082 10.7898C1.12082 10.4205 0.997239 10 1.00008 9.52841C0.997239 9.15909 1.06968 8.81818 1.21741 8.50568C1.36514 8.19034 1.56684 7.92756 1.82252 7.71733C2.08105 7.50426 2.3694 7.36932 2.68758 7.3125V7.26136C2.26997 7.15341 1.93758 6.91903 1.69042 6.55824C1.44326 6.1946 1.3211 5.78125 1.32394 5.31818C1.3211 4.875 1.43332 4.47869 1.66059 4.12926C1.88786 3.77983 2.20036 3.50426 2.59809 3.30256C2.99866 3.10085 3.45463 3 3.96599 3C4.47167 3 4.92338 3.10085 5.3211 3.30256C5.71883 3.50426 6.03133 3.77983 6.2586 4.12926C6.48872 4.47869 6.60519 4.875 6.60804 5.31818C6.60519 5.78125 6.47877 6.1946 6.22877 6.55824C5.98161 6.91903 5.65349 7.15341 5.2444 7.26136V7.3125C5.55974 7.36932 5.84383 7.50426 6.09667 7.71733C6.34951 7.92756 6.55122 8.19034 6.70179 8.50568C6.85235 8.81818 6.92906 9.15909 6.9319 9.52841C6.92906 10 6.80122 10.4205 6.54838 10.7898C6.29838 11.1563 5.95036 11.4446 5.50434 11.6548C5.06116 11.8622 4.54838 11.9659 3.96599 11.9659ZM3.96599 11.0284C4.36088 11.0284 4.70178 10.9645 4.98872 10.8366C5.27565 10.7088 5.49724 10.5284 5.65349 10.2955C5.80974 10.0625 5.88928 9.78977 5.89213 9.47727C5.88928 9.14773 5.80406 8.85653 5.63644 8.60369C5.46883 8.35085 5.24014 8.15199 4.95036 8.0071C4.66343 7.86222 4.33531 7.78977 3.96599 7.78977C3.59383 7.78977 3.26144 7.86222 2.96883 8.0071C2.67906 8.15199 2.45036 8.35085 2.28275 8.60369C2.11798 8.85653 2.03701 9.14773 2.03985 9.47727C2.03701 9.78977 2.1123 10.0625 2.26571 10.2955C2.42196 10.5284 2.64497 10.7088 2.93474 10.8366C3.22451 10.9645 3.56826 11.0284 3.96599 11.0284ZM3.96599 6.88636C4.27849 6.88636 4.55548 6.82386 4.79696 6.69886C5.04127 6.57386 5.23304 6.39915 5.37224 6.17472C5.51144 5.95028 5.58247 5.6875 5.58531 5.38636C5.58247 5.09091 5.51286 4.83381 5.3765 4.61506C5.24014 4.39347 5.05122 4.22301 4.80974 4.10369C4.56826 3.98153 4.28701 3.92045 3.96599 3.92045C3.63928 3.92045 3.35377 3.98153 3.10946 4.10369C2.86514 4.22301 2.67622 4.39347 2.54269 4.61506C2.40917 4.83381 2.34383 5.09091 2.34667 5.38636C2.34383 5.6875 2.41059 5.95028 2.54696 6.17472C2.68616 6.39915 2.87792 6.57386 3.12224 6.69886C3.36656 6.82386 3.64781 6.88636 3.96599 6.88636Z" />
    <path d="M11.1389 10.3125V4.6875H12.0935V10.3125H11.1389ZM8.8037 7.97727V7.02273H14.4287V7.97727H8.8037Z" />
  </svg>
)

const AtMark = (props: IconProps) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="black"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7.36932 12.7045C6.5 12.7045 5.73153 12.5852 5.06392 12.3466C4.39631 12.1108 3.83523 11.7628 3.38068 11.3026C2.92614 10.8423 2.58239 10.2784 2.34943 9.6108C2.11648 8.94318 2 8.17898 2 7.31818C2 6.4858 2.1179 5.74148 2.35369 5.08523C2.59233 4.42898 2.9375 3.87216 3.3892 3.41477C3.84375 2.95455 4.39489 2.60369 5.04261 2.36222C5.69318 2.12074 6.42898 2 7.25 2C8.0483 2 8.74716 2.13068 9.34659 2.39205C9.94886 2.65057 10.4517 3.00142 10.8551 3.4446C11.2614 3.88494 11.5653 4.38068 11.767 4.93182C11.9716 5.48295 12.0739 6.05114 12.0739 6.63636C12.0739 7.0483 12.054 7.46591 12.0142 7.8892C11.9744 8.3125 11.8906 8.7017 11.7628 9.05682C11.6349 9.40909 11.4375 9.69318 11.1705 9.90909C10.9063 10.125 10.5483 10.233 10.0966 10.233C9.89773 10.233 9.67898 10.2017 9.44034 10.1392C9.2017 10.0767 8.99006 9.97301 8.8054 9.82813C8.62074 9.68324 8.51136 9.48864 8.47727 9.24432H8.42614C8.35795 9.40909 8.25284 9.56534 8.1108 9.71307C7.97159 9.8608 7.78835 9.97869 7.56108 10.0668C7.33665 10.1548 7.0625 10.1932 6.73864 10.1818C6.36932 10.1676 6.04403 10.0852 5.76278 9.93466C5.48153 9.78125 5.24574 9.57386 5.0554 9.3125C4.8679 9.0483 4.72585 8.7429 4.62926 8.39631C4.53551 8.04688 4.48864 7.67045 4.48864 7.26705C4.48864 6.88352 4.54545 6.53267 4.65909 6.21449C4.77273 5.89631 4.9304 5.6179 5.1321 5.37926C5.33665 5.14063 5.57528 4.95028 5.84801 4.80824C6.12358 4.66335 6.42045 4.57386 6.73864 4.53977C7.02273 4.51136 7.28125 4.52415 7.5142 4.57813C7.74716 4.62926 7.93892 4.70739 8.08949 4.8125C8.24006 4.91477 8.33523 5.02841 8.375 5.15341H8.42614V4.67614H9.32955V8.52841C9.32955 8.76705 9.39631 8.97727 9.52983 9.15909C9.66335 9.34091 9.85795 9.43182 10.1136 9.43182C10.4034 9.43182 10.625 9.33239 10.7784 9.13352C10.9347 8.93466 11.0412 8.62784 11.098 8.21307C11.1577 7.7983 11.1875 7.26705 11.1875 6.61932C11.1875 6.23864 11.1349 5.86364 11.0298 5.49432C10.9276 5.12216 10.7713 4.77415 10.5611 4.45028C10.3537 4.12642 10.0909 3.84091 9.77273 3.59375C9.45455 3.34659 9.08097 3.15341 8.65199 3.0142C8.22585 2.87216 7.74148 2.80114 7.19886 2.80114C6.53125 2.80114 5.93324 2.90483 5.40483 3.11222C4.87926 3.31676 4.43182 3.61648 4.0625 4.01136C3.69602 4.40341 3.41619 4.88068 3.22301 5.44318C3.03267 6.00284 2.9375 6.6392 2.9375 7.35227C2.9375 8.0767 3.03267 8.72017 3.22301 9.28267C3.41619 9.84517 3.70028 10.3196 4.07528 10.706C4.45312 11.0923 4.92045 11.3849 5.47727 11.5838C6.03409 11.7855 6.67614 11.8864 7.40341 11.8864C7.71591 11.8864 8.02415 11.8565 8.32813 11.7969C8.6321 11.7372 8.90057 11.6719 9.13352 11.6009C9.36648 11.5298 9.53409 11.4773 9.63636 11.4432L9.875 12.2273C9.69886 12.3011 9.46875 12.375 9.18466 12.4489C8.90341 12.5227 8.60227 12.5838 8.28125 12.6321C7.96307 12.6804 7.65909 12.7045 7.36932 12.7045ZM6.875 9.3125C7.25568 9.3125 7.56392 9.2358 7.79972 9.08239C8.03551 8.92898 8.20739 8.69744 8.31534 8.38778C8.4233 8.07813 8.47727 7.6875 8.47727 7.21591C8.47727 6.73864 8.41761 6.36648 8.2983 6.09943C8.17898 5.83239 8.00284 5.64489 7.76989 5.53693C7.53693 5.42898 7.25 5.375 6.90909 5.375C6.58523 5.375 6.30824 5.46023 6.07812 5.63068C5.85085 5.7983 5.67614 6.02273 5.55398 6.30398C5.43466 6.58239 5.375 6.88636 5.375 7.21591C5.375 7.57955 5.4233 7.92188 5.51989 8.2429C5.61648 8.56108 5.77415 8.8196 5.9929 9.01847C6.21165 9.21449 6.50568 9.3125 6.875 9.3125Z" />
  </svg>
)

export {
  Home,
  Person,
  LowerCaseLetter,
  UpperCaseLetter,
  OpenEye,
  ClosedEye,
  EightPlus,
  AtMark,
  InfoCircle
}
