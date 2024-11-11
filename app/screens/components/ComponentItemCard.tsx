import { Text } from '@/components'
import { Component } from '@/models/Component'
import React from 'react'
import { View } from 'react-native'
import { $row } from '../styles'

interface ComponentItemCardProps {
  component: Component
}

export const ComponentItemCard = (props: ComponentItemCardProps) => {
  const { component } = props;
  return (
    <>
        <View style={$row}>
          <Text preset="bold" text={component.component ?? ''} />
          <Text preset="default" text={component.urgency} style={{
            color: component.priorityLevelColor
          }} />
        </View>
        {
          component.notes && (
            <Text preset="caption" text={component.notes} />
          )
        }
      </>
  )
}
