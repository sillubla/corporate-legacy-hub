-- Corporate Legacy Hub
-- Datos de demostración para el modelo relacional.
--
-- Requisitos:
--   1. Ejecutar primero supabase/legacy_hub_schema.sql
--   2. Abrir Supabase Dashboard -> SQL Editor -> New query
--   3. Pegar este archivo completo y pulsar Run
--
-- El script es idempotente: puede ejecutarse varias veces sin duplicar datos.
-- Los usuarios creados son identidades de demostración sin contraseña válida.

begin;

-- ---------------------------------------------------------------------------
-- Usuarios de demostración
-- ---------------------------------------------------------------------------

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-4000-8000-000000000001',
    'authenticated',
    'authenticated',
    'teresa.demo@legacy-hub.invalid',
    '',
    now(),
    '{"provider":"email","providers":["email"],"demo":true}'::jsonb,
    '{"display_name":"Teresa Alarcón"}'::jsonb,
    now() - interval '5 years',
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-4000-8000-000000000002',
    'authenticated',
    'authenticated',
    'manuel.demo@legacy-hub.invalid',
    '',
    now(),
    '{"provider":"email","providers":["email"],"demo":true}'::jsonb,
    '{"display_name":"Manuel Echeverría"}'::jsonb,
    now() - interval '4 years',
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-4000-8000-000000000003',
    'authenticated',
    'authenticated',
    'elena.demo@legacy-hub.invalid',
    '',
    now(),
    '{"provider":"email","providers":["email"],"demo":true}'::jsonb,
    '{"display_name":"Elena Rovira"}'::jsonb,
    now() - interval '3 years',
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-4000-8000-000000000004',
    'authenticated',
    'authenticated',
    'carlos.demo@legacy-hub.invalid',
    '',
    now(),
    '{"provider":"email","providers":["email"],"demo":true}'::jsonb,
    '{"display_name":"Carlos Núñez"}'::jsonb,
    now() - interval '2 years',
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-4000-8000-000000000005',
    'authenticated',
    'authenticated',
    'isabel.demo@legacy-hub.invalid',
    '',
    now(),
    '{"provider":"email","providers":["email"],"demo":true}'::jsonb,
    '{"display_name":"Isabel Montero"}'::jsonb,
    now() - interval '18 months',
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '10000000-0000-4000-8000-000000000006',
    'authenticated',
    'authenticated',
    'alex.demo@legacy-hub.invalid',
    '',
    now(),
    '{"provider":"email","providers":["email"],"demo":true}'::jsonb,
    '{"display_name":"Alex Martín"}'::jsonb,
    now() - interval '1 year',
    now()
  )
on conflict (id) do update set
  raw_app_meta_data = excluded.raw_app_meta_data,
  raw_user_meta_data = excluded.raw_user_meta_data,
  updated_at = now();

-- ---------------------------------------------------------------------------
-- Perfiles
-- ---------------------------------------------------------------------------

insert into public.profiles (
  id,
  display_name,
  job_title,
  department,
  bio,
  avatar_path,
  years_of_experience,
  is_expert,
  is_admin
)
values
  (
    '10000000-0000-4000-8000-000000000001',
    'Teresa Alarcón',
    'Exdirectora de Operaciones',
    'Operaciones',
    'Especialista en continuidad de negocio, gestión de crisis y transformación industrial. Ha acompañado cuatro aperturas de planta y dos procesos de integración.',
    'https://images.unsplash.com/photo-1758691737605-69a0e78bd193?auto=format&fit=crop&w=320&q=85',
    32,
    true,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000002',
    'Manuel Echeverría',
    'Maestro de mantenimiento',
    'Mantenimiento',
    'Referente técnico en mantenimiento predictivo y seguridad de instalaciones. Defensor de documentar aquello que normalmente solo se aprende observando.',
    'https://images.unsplash.com/photo-1738566061874-2160e9f4a064?auto=format&fit=crop&w=320&q=85',
    27,
    true,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000003',
    'Elena Rovira',
    'Exdirectora comercial',
    'Comercial',
    'Experta en negociación compleja, recuperación de cuentas y construcción de relaciones de confianza a largo plazo.',
    'https://images.unsplash.com/photo-1623679681421-6db68b92d5f5?auto=format&fit=crop&w=320&q=85',
    24,
    true,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000004',
    'Carlos Núñez',
    'Director de Estrategia',
    'Estrategia',
    'Ha liderado proyectos de internacionalización, fusiones y rediseño organizativo. Comparte herramientas para tomar decisiones con información incompleta.',
    'https://images.unsplash.com/photo-1624245532111-8f4aba352ba9?auto=format&fit=crop&w=320&q=85',
    21,
    true,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000005',
    'Isabel Montero',
    'Responsable de Personas y Cultura',
    'Personas',
    'Facilitadora de procesos de cambio cultural, mentoring intergeneracional y desarrollo de liderazgo.',
    'https://images.unsplash.com/photo-1750853753878-a3635d19e41b?auto=format&fit=crop&w=320&q=85',
    19,
    true,
    false
  ),
  (
    '10000000-0000-4000-8000-000000000006',
    'Alex Martín',
    'Especialista de Personas y Cultura',
    'Personas',
    'Facilita la captura, edición y difusión del conocimiento interno de la organización.',
    null,
    6,
    false,
    true
  )
on conflict (id) do update set
  display_name = excluded.display_name,
  job_title = excluded.job_title,
  department = excluded.department,
  bio = excluded.bio,
  avatar_path = excluded.avatar_path,
  years_of_experience = excluded.years_of_experience,
  is_expert = excluded.is_expert,
  is_admin = excluded.is_admin,
  updated_at = now();

-- ---------------------------------------------------------------------------
-- Etiquetas
-- ---------------------------------------------------------------------------

insert into public.tags (name, slug)
values
  ('Gestión de crisis', 'gestion-de-crisis'),
  ('Operaciones', 'operaciones'),
  ('Decisiones', 'decisiones'),
  ('Mantenimiento', 'mantenimiento'),
  ('Prevención', 'prevencion'),
  ('Seguridad', 'seguridad'),
  ('Clientes', 'clientes'),
  ('Negociación', 'negociacion'),
  ('Confianza', 'confianza'),
  ('Liderazgo', 'liderazgo'),
  ('Cambio cultural', 'cambio-cultural'),
  ('Estrategia', 'estrategia'),
  ('Innovación', 'innovacion'),
  ('Trabajo en equipo', 'trabajo-en-equipo'),
  ('Errores aprendidos', 'errores-aprendidos'),
  ('Expansión internacional', 'expansion-internacional')
on conflict (slug) do update set name = excluded.name;

-- ---------------------------------------------------------------------------
-- Cápsulas
-- ---------------------------------------------------------------------------

insert into public.capsules (
  id,
  author_id,
  title,
  summary,
  format,
  category,
  duration_seconds,
  media_path,
  transcript,
  status,
  featured,
  published_at,
  created_at,
  updated_at
)
values
  (
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000001',
    'La decisión que salvó la planta de Valencia en 2008',
    'Cuando todo indicaba que debíamos detener la producción, un dato que nadie estaba mirando cambió la conversación. Esta es la secuencia de tres decisiones que evitó una crisis mayor.',
    'audio',
    'Gestión de crisis',
    222,
    '10000000-0000-4000-8000-000000000001/20000000-0000-4000-8000-000000000001/audio.mp3',
    'Era martes por la mañana cuando recibimos la primera alerta. La presión del equipo era detener toda la línea, pero antes pedí revisar tres indicadores que normalmente se analizaban por separado...',
    'published',
    true,
    now() - interval '2 hours',
    now() - interval '2 hours',
    now() - interval '2 hours'
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000002',
    'El ruido que anticipó una avería de 120.000 €',
    'Una demostración práctica para detectar el patrón de vibración que precede al fallo de los compresores Atlas: qué escuchar, dónde medir y cuándo parar.',
    'video',
    'Lecciones técnicas',
    128,
    '10000000-0000-4000-8000-000000000002/20000000-0000-4000-8000-000000000002/video.mp4',
    'Acercaos al lateral izquierdo del compresor. Este golpeteo irregular no viene del motor, sino del segundo rodamiento...',
    'published',
    true,
    now() - interval '1 day',
    now() - interval '1 day',
    now() - interval '1 day'
  ),
  (
    '20000000-0000-4000-8000-000000000003',
    '10000000-0000-4000-8000-000000000003',
    'Cómo recuperamos a nuestro cliente más antiguo',
    'No fue una gran presentación ni un descuento. Fue una pregunta concreta, una escucha honesta y una promesa que sí podíamos cumplir.',
    'case',
    'Relaciones con clientes',
    240,
    null,
    'El cliente llevaba dieciocho años con nosotros. Cuando comunicó que revisaría proveedores, nuestra reacción inicial fue preparar una oferta económica...',
    'published',
    false,
    now() - interval '3 days',
    now() - interval '3 days',
    now() - interval '3 days'
  ),
  (
    '20000000-0000-4000-8000-000000000004',
    '10000000-0000-4000-8000-000000000004',
    'La expansión que tuvimos que frenar para poder crecer',
    'Entrar en tres mercados a la vez parecía una oportunidad irrepetible. Detener uno de los lanzamientos fue la decisión que permitió que los otros dos funcionaran.',
    'case',
    'Estrategia',
    300,
    null,
    'Confundimos velocidad con progreso. El cuadro de mando mostraba actividad en los tres mercados, pero no aprendizaje...',
    'published',
    false,
    now() - interval '5 days',
    now() - interval '5 days',
    now() - interval '5 days'
  ),
  (
    '20000000-0000-4000-8000-000000000005',
    '10000000-0000-4000-8000-000000000005',
    'El cambio cultural que empezó en una reunión de 15 minutos',
    'Una práctica sencilla para convertir las reuniones operativas en espacios de aprendizaje, sin añadir más reuniones al calendario.',
    'audio',
    'Liderazgo',
    195,
    '10000000-0000-4000-8000-000000000005/20000000-0000-4000-8000-000000000005/audio.mp3',
    'Durante meses intentamos cambiar la cultura mediante grandes iniciativas. Lo que realmente funcionó fue reservar los últimos quince minutos del lunes...',
    'published',
    false,
    now() - interval '6 days',
    now() - interval '6 days',
    now() - interval '6 days'
  ),
  (
    '20000000-0000-4000-8000-000000000006',
    '10000000-0000-4000-8000-000000000002',
    'Tres comprobaciones antes de reiniciar una línea',
    'Una lista breve que evita que un reinicio apresurado convierta una incidencia menor en una parada completa de producción.',
    'case',
    'Lecciones técnicas',
    180,
    null,
    'Antes de reiniciar comprobad alimentación, bloqueo físico y estado de sensores. El orden importa porque...',
    'published',
    false,
    now() - interval '8 days',
    now() - interval '8 days',
    now() - interval '8 days'
  ),
  (
    '20000000-0000-4000-8000-000000000007',
    '10000000-0000-4000-8000-000000000001',
    'Qué hacer durante los primeros 30 minutos de una crisis',
    'Cómo organizar información, responsabilidades y comunicación cuando todavía no existe una imagen completa de lo que está ocurriendo.',
    'audio',
    'Gestión de crisis',
    274,
    '10000000-0000-4000-8000-000000000001/20000000-0000-4000-8000-000000000007/audio.mp3',
    'Los primeros treinta minutos no sirven para encontrar la solución definitiva. Sirven para evitar que la incertidumbre se convierta en desorden...',
    'published',
    false,
    now() - interval '10 days',
    now() - interval '10 days',
    now() - interval '10 days'
  ),
  (
    '20000000-0000-4000-8000-000000000008',
    '10000000-0000-4000-8000-000000000003',
    'La pregunta que desbloquea una negociación estancada',
    'Cuando ambas partes repiten posiciones, esta pregunta permite volver a hablar de necesidades reales y encontrar margen de acuerdo.',
    'video',
    'Relaciones con clientes',
    116,
    '10000000-0000-4000-8000-000000000003/20000000-0000-4000-8000-000000000008/video.mp4',
    'En lugar de preguntar qué descuento necesitan, preguntad qué tendría que ser verdad para que pudieran defender internamente el acuerdo...',
    'published',
    false,
    now() - interval '12 days',
    now() - interval '12 days',
    now() - interval '12 days'
  ),
  (
    '20000000-0000-4000-8000-000000000009',
    '10000000-0000-4000-8000-000000000004',
    'Decidir con un 70 % de la información',
    'Una matriz práctica para distinguir qué información es imprescindible y qué incertidumbre puede gestionarse durante la ejecución.',
    'case',
    'Estrategia',
    360,
    null,
    'Esperar certeza también es una decisión. Para evitar la parálisis clasificamos cada incógnita por impacto y reversibilidad...',
    'published',
    false,
    now() - interval '15 days',
    now() - interval '15 days',
    now() - interval '15 days'
  ),
  (
    '20000000-0000-4000-8000-000000000010',
    '10000000-0000-4000-8000-000000000005',
    'Cómo pedir ayuda sin perder autoridad',
    'Una historia sobre liderazgo vulnerable y sobre cómo reconocer a tiempo que el equipo necesita una experiencia que tú no tienes.',
    'audio',
    'Liderazgo',
    205,
    '10000000-0000-4000-8000-000000000005/20000000-0000-4000-8000-000000000010/audio.mp3',
    'Durante años pensé que liderar significaba llegar a la reunión con todas las respuestas. El proyecto Delta me enseñó exactamente lo contrario...',
    'published',
    false,
    now() - interval '18 days',
    now() - interval '18 days',
    now() - interval '18 days'
  ),
  (
    '20000000-0000-4000-8000-000000000011',
    '10000000-0000-4000-8000-000000000002',
    'La inspección visual de cinco minutos',
    'Cinco señales que conviene revisar al iniciar turno y que suelen anticipar fugas, desgaste o problemas de alineación.',
    'video',
    'Lecciones técnicas',
    142,
    '10000000-0000-4000-8000-000000000002/20000000-0000-4000-8000-000000000011/video.mp4',
    'Empezamos por las uniones flexibles. Buscad cambios de color, polvo adherido y pequeñas marcas en diagonal...',
    'published',
    false,
    now() - interval '21 days',
    now() - interval '21 days',
    now() - interval '21 days'
  ),
  (
    '20000000-0000-4000-8000-000000000012',
    '10000000-0000-4000-8000-000000000004',
    'Lo que aprendimos al cerrar nuestra primera oficina internacional',
    'El cierre no fue un fracaso: permitió identificar cinco condiciones mínimas para que una expansión internacional sea sostenible.',
    'case',
    'Estrategia',
    420,
    null,
    'La oficina cumplía sus objetivos comerciales, pero dependía de demasiadas excepciones operativas. Al analizar el cierre descubrimos...',
    'published',
    false,
    now() - interval '24 days',
    now() - interval '24 days',
    now() - interval '24 days'
  )
on conflict (id) do update set
  author_id = excluded.author_id,
  title = excluded.title,
  summary = excluded.summary,
  format = excluded.format,
  category = excluded.category,
  duration_seconds = excluded.duration_seconds,
  media_path = excluded.media_path,
  transcript = excluded.transcript,
  status = excluded.status,
  featured = excluded.featured,
  published_at = excluded.published_at,
  updated_at = now();

-- ---------------------------------------------------------------------------
-- Relaciones cápsula-etiqueta
-- ---------------------------------------------------------------------------

with mappings(capsule_id, tag_slug) as (
  values
    ('20000000-0000-4000-8000-000000000001'::uuid, 'gestion-de-crisis'),
    ('20000000-0000-4000-8000-000000000001'::uuid, 'operaciones'),
    ('20000000-0000-4000-8000-000000000001'::uuid, 'decisiones'),
    ('20000000-0000-4000-8000-000000000002'::uuid, 'mantenimiento'),
    ('20000000-0000-4000-8000-000000000002'::uuid, 'prevencion'),
    ('20000000-0000-4000-8000-000000000002'::uuid, 'seguridad'),
    ('20000000-0000-4000-8000-000000000003'::uuid, 'clientes'),
    ('20000000-0000-4000-8000-000000000003'::uuid, 'negociacion'),
    ('20000000-0000-4000-8000-000000000003'::uuid, 'confianza'),
    ('20000000-0000-4000-8000-000000000004'::uuid, 'estrategia'),
    ('20000000-0000-4000-8000-000000000004'::uuid, 'expansion-internacional'),
    ('20000000-0000-4000-8000-000000000004'::uuid, 'errores-aprendidos'),
    ('20000000-0000-4000-8000-000000000005'::uuid, 'liderazgo'),
    ('20000000-0000-4000-8000-000000000005'::uuid, 'cambio-cultural'),
    ('20000000-0000-4000-8000-000000000005'::uuid, 'trabajo-en-equipo'),
    ('20000000-0000-4000-8000-000000000006'::uuid, 'mantenimiento'),
    ('20000000-0000-4000-8000-000000000006'::uuid, 'prevencion'),
    ('20000000-0000-4000-8000-000000000007'::uuid, 'gestion-de-crisis'),
    ('20000000-0000-4000-8000-000000000007'::uuid, 'liderazgo'),
    ('20000000-0000-4000-8000-000000000008'::uuid, 'negociacion'),
    ('20000000-0000-4000-8000-000000000008'::uuid, 'clientes'),
    ('20000000-0000-4000-8000-000000000009'::uuid, 'decisiones'),
    ('20000000-0000-4000-8000-000000000009'::uuid, 'estrategia'),
    ('20000000-0000-4000-8000-000000000010'::uuid, 'liderazgo'),
    ('20000000-0000-4000-8000-000000000010'::uuid, 'trabajo-en-equipo'),
    ('20000000-0000-4000-8000-000000000011'::uuid, 'mantenimiento'),
    ('20000000-0000-4000-8000-000000000011'::uuid, 'seguridad'),
    ('20000000-0000-4000-8000-000000000012'::uuid, 'expansion-internacional'),
    ('20000000-0000-4000-8000-000000000012'::uuid, 'errores-aprendidos')
)
insert into public.capsule_tags (capsule_id, tag_id)
select mappings.capsule_id, tags.id
from mappings
join public.tags on tags.slug = mappings.tag_slug
on conflict (capsule_id, tag_id) do nothing;

-- ---------------------------------------------------------------------------
-- Preguntas y respuestas
-- ---------------------------------------------------------------------------

insert into public.questions (id, capsule_id, author_id, body, created_at, updated_at)
values
  (
    '30000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000006',
    '¿Qué indicador fue el que finalmente cambió la decisión del equipo?',
    now() - interval '90 minutes',
    now() - interval '90 minutes'
  ),
  (
    '30000000-0000-4000-8000-000000000002',
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000004',
    '¿Cómo comunicasteis la decisión a los responsables de seguridad?',
    now() - interval '70 minutes',
    now() - interval '70 minutes'
  ),
  (
    '30000000-0000-4000-8000-000000000003',
    '20000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000006',
    '¿Este patrón también aparece en los compresores de la serie anterior?',
    now() - interval '20 hours',
    now() - interval '20 hours'
  ),
  (
    '30000000-0000-4000-8000-000000000004',
    '20000000-0000-4000-8000-000000000003',
    '10000000-0000-4000-8000-000000000005',
    '¿Qué pregunta utilizaste para iniciar la conversación con el cliente?',
    now() - interval '2 days',
    now() - interval '2 days'
  ),
  (
    '30000000-0000-4000-8000-000000000005',
    '20000000-0000-4000-8000-000000000004',
    '10000000-0000-4000-8000-000000000003',
    '¿Qué señales os hicieron ver que la expansión no era sostenible?',
    now() - interval '4 days',
    now() - interval '4 days'
  ),
  (
    '30000000-0000-4000-8000-000000000006',
    '20000000-0000-4000-8000-000000000005',
    '10000000-0000-4000-8000-000000000001',
    '¿Cómo evitasteis que esos quince minutos se convirtieran en otra reunión de seguimiento?',
    now() - interval '5 days',
    now() - interval '5 days'
  )
on conflict (id) do update set
  capsule_id = excluded.capsule_id,
  author_id = excluded.author_id,
  body = excluded.body,
  updated_at = excluded.updated_at;

insert into public.answers (
  id,
  question_id,
  author_id,
  body,
  is_expert_answer,
  created_at,
  updated_at
)
values
  (
    '40000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000001',
    'Fue la tendencia de temperatura por lote, no la temperatura instantánea. Al compararla con las últimas seis horas vimos que el sistema se estaba estabilizando.',
    true,
    now() - interval '80 minutes',
    now() - interval '80 minutes'
  ),
  (
    '40000000-0000-4000-8000-000000000002',
    '30000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000001',
    'Les presentamos tres escenarios con sus límites de seguridad. No pedimos confianza ciega: acordamos juntos qué señal activaría la parada.',
    true,
    now() - interval '55 minutes',
    now() - interval '55 minutes'
  ),
  (
    '40000000-0000-4000-8000-000000000003',
    '30000000-0000-4000-8000-000000000003',
    '10000000-0000-4000-8000-000000000002',
    'Sí, aunque en la serie anterior el intervalo entre golpes es más largo. Conviene contrastarlo con la lectura del segundo sensor.',
    true,
    now() - interval '18 hours',
    now() - interval '18 hours'
  ),
  (
    '40000000-0000-4000-8000-000000000004',
    '30000000-0000-4000-8000-000000000004',
    '10000000-0000-4000-8000-000000000003',
    'Pregunté: “¿Qué ha cambiado para que una relación de dieciocho años ya no os resulte suficiente?”. Después guardé silencio.',
    true,
    now() - interval '40 hours',
    now() - interval '40 hours'
  ),
  (
    '40000000-0000-4000-8000-000000000005',
    '30000000-0000-4000-8000-000000000005',
    '10000000-0000-4000-8000-000000000004',
    'El equipo local dedicaba más tiempo a resolver excepciones internas que a hablar con clientes. Ese fue el indicador más claro.',
    true,
    now() - interval '3 days',
    now() - interval '3 days'
  ),
  (
    '40000000-0000-4000-8000-000000000006',
    '30000000-0000-4000-8000-000000000006',
    '10000000-0000-4000-8000-000000000005',
    'Solo admitíamos dos preguntas: qué aprendimos esta semana y qué haremos diferente. Los temas operativos debían resolverse antes.',
    true,
    now() - interval '4 days',
    now() - interval '4 days'
  )
on conflict (id) do update set
  question_id = excluded.question_id,
  author_id = excluded.author_id,
  body = excluded.body,
  is_expert_answer = excluded.is_expert_answer,
  updated_at = excluded.updated_at;

-- ---------------------------------------------------------------------------
-- Reacciones
-- ---------------------------------------------------------------------------

insert into public.reactions (capsule_id, user_id, reaction_type, created_at)
values
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000002', 'like', now() - interval '100 minutes'),
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000003', 'useful', now() - interval '95 minutes'),
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000004', 'inspiring', now() - interval '90 minutes'),
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000006', 'like', now() - interval '60 minutes'),
  ('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', 'useful', now() - interval '22 hours'),
  ('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000006', 'like', now() - interval '19 hours'),
  ('20000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000001', 'inspiring', now() - interval '2 days'),
  ('20000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000004', 'like', now() - interval '2 days'),
  ('20000000-0000-4000-8000-000000000004', '10000000-0000-4000-8000-000000000003', 'useful', now() - interval '4 days'),
  ('20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000000001', 'inspiring', now() - interval '5 days'),
  ('20000000-0000-4000-8000-000000000007', '10000000-0000-4000-8000-000000000006', 'useful', now() - interval '8 days'),
  ('20000000-0000-4000-8000-000000000009', '10000000-0000-4000-8000-000000000005', 'like', now() - interval '14 days')
on conflict (capsule_id, user_id, reaction_type) do nothing;

-- ---------------------------------------------------------------------------
-- Favoritos y progreso
-- ---------------------------------------------------------------------------

insert into public.favorites (capsule_id, user_id, created_at)
values
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000006', now() - interval '1 hour'),
  ('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000006', now() - interval '18 hours'),
  ('20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000000006', now() - interval '4 days'),
  ('20000000-0000-4000-8000-000000000009', '10000000-0000-4000-8000-000000000003', now() - interval '12 days'),
  ('20000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000001', now() - interval '2 days')
on conflict (capsule_id, user_id) do nothing;

insert into public.playback_progress (
  capsule_id,
  user_id,
  progress_seconds,
  completed,
  play_count,
  last_played_at
)
values
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000006', 222, true, 2, now() - interval '50 minutes'),
  ('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000006', 74, false, 1, now() - interval '17 hours'),
  ('20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000000006', 195, true, 1, now() - interval '4 days'),
  ('20000000-0000-4000-8000-000000000007', '10000000-0000-4000-8000-000000000003', 180, false, 1, now() - interval '7 days'),
  ('20000000-0000-4000-8000-000000000010', '10000000-0000-4000-8000-000000000001', 205, true, 3, now() - interval '15 days')
on conflict (capsule_id, user_id) do update set
  progress_seconds = excluded.progress_seconds,
  completed = excluded.completed,
  play_count = excluded.play_count,
  last_played_at = excluded.last_played_at;

commit;

-- ---------------------------------------------------------------------------
-- Comprobación del seed
-- ---------------------------------------------------------------------------
-- Ejecuta esta consulta después del script para ver el resumen:
--
-- select 'profiles' as entity, count(*) as total from public.profiles
-- union all select 'capsules', count(*) from public.capsules
-- union all select 'tags', count(*) from public.tags
-- union all select 'questions', count(*) from public.questions
-- union all select 'answers', count(*) from public.answers
-- union all select 'reactions', count(*) from public.reactions
-- union all select 'favorites', count(*) from public.favorites;
--
-- Nota sobre multimedia:
-- Las rutas media_path quedan preparadas, pero los archivos binarios no pueden
-- crearse mediante SQL. Para probar la reproducción, sube archivos al bucket
-- capsule-media respetando las rutas indicadas en public.capsules.media_path.
