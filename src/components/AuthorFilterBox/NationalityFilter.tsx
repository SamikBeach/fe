import { getAllNationalities } from '@apis/nationality';
import { selectedNationalityIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useReactFlow } from 'reactflow';
import { css } from 'styled-system/css';

function NationalityFilter() {
  const setSelectedNationalityId = useSetAtom(selectedNationalityIdAtom);

  const { data: nationality = [] } = useQuery({
    queryKey: ['nationality'],
    queryFn: getAllNationalities,
    select: response => response.data,
  });

  const reactflow = useReactFlow();

  return (
    <Select.Root
      onValueChange={value => {
        setSelectedNationalityId(Number(value));

        reactflow.setNodes(nodes => {
          return nodes.map(node => {
            if (node.data?.nationality.id === Number(value)) {
              return {
                ...node,
                data: {
                  ...node.data,
                  activeFiltered: true,
                },
              };
            }

            return { ...node, data: { ...node.data, activeFiltered: false } };
          });
        });
      }}
    >
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="Pick a nationality"
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>Nationality</Select.Label>
          {nationality
            .sort((a, b) => a.nationality.localeCompare(b.nationality))
            .map(_nationality => (
              <Select.Item
                key={_nationality.id}
                value={String(_nationality.id)}
              >
                {_nationality.nationality}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default NationalityFilter;
