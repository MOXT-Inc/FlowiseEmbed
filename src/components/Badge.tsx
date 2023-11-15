import { onCleanup, onMount } from 'solid-js'

type Props = {
  botContainer: HTMLDivElement | undefined
  poweredByTextColor?: string
  badgeBackgroundColor?: string
}

const defaultTextColor = '#303235'

export const Badge = (props: Props) => {
  let liteBadge: HTMLAnchorElement | undefined
  let observer: MutationObserver | undefined

  const appendBadgeIfNecessary = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((removedNode) => {
        if (
          'id' in removedNode &&
          liteBadge &&
          removedNode.id == 'lite-badge'
        ) {
          console.log("Sorry, you can't remove the brand 😅")
          props.botContainer?.append(liteBadge)
        }
      })
    })
  }

  onMount(() => {
    if (!document || !props.botContainer) return
    observer = new MutationObserver(appendBadgeIfNecessary)
    observer.observe(props.botContainer, {
      subtree: false,
      childList: true,
    })
  })

  onCleanup(() => {
    if (observer) observer.disconnect()
  })

  return (
    <span style={{
      "font-size": '10px',
      position: 'absolute',
      bottom: 0,
      padding: '10px',
      margin: 'auto',
      width: '100%',
      "text-align": 'center',
      color: props.poweredByTextColor ?? defaultTextColor,
      "background-color": props.badgeBackgroundColor ?? '#ffffff'
    }}>AI生成のため正確性は保証されません。自己責任で利用ください。
    
       AIによる自動生成回答を利用しており、内容を鵜呑みにせずご自身で確認をお願いします。
    </span>
  )
}
